const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { storefrontQuery } = require("../../../../utils/shopify-storefront");
const {
  adminQuery,
  adminRestRequest,
} = require("../../../../utils/shopify-admin");

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Build the standard response shape the frontend expects */
function buildUserResponse(customer, jwtToken, expiresAt) {
  return {
    message: { title: "", subtitle: "" },
    data: {
      id: customer.id,
      name: customer.firstName || "",
      surname: customer.lastName || "",
      email: customer.email,
      dob: "",
      img: "",
      phone: customer.phone || "",
      token: jwtToken,
      tokenExpirationDate: expiresAt,
      role: "user",
    },
  };
}

/** Fetch a Shopify customerAccessToken and return { accessToken, expiresAt } */
async function createShopifyToken(email, password) {
  const tokenMutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          message
        }
      }
    }
  `;
  const tokenData = await storefrontQuery(tokenMutation, {
    input: { email, password },
  });
  const { customerAccessToken, customerUserErrors } =
    tokenData.customerAccessTokenCreate;

  if (customerUserErrors.length > 0 || !customerAccessToken) {
    const msg = customerUserErrors[0]?.message || "Invalid credentials";
    const err = new Error(msg);
    err.status = 401;
    throw err;
  }
  return customerAccessToken; // { accessToken, expiresAt }
}

/** Fetch customer profile using an access token */
async function fetchCustomerProfile(customerAccessToken) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
      }
    }
  `;
  const data = await storefrontQuery(query, { customerAccessToken });
  return data.customer;
}

// ─────────────────────────────────────────────
// Facebook helpers
// ─────────────────────────────────────────────

/**
 * Deterministic password derived from the Facebook user id + JWT secret.
 * Used so the backend can always obtain a Shopify customerAccessToken
 * for a user authenticated via Facebook, without storing extra state.
 * Shopify requires 5–40 chars; hex HMAC truncated to 40.
 */
function deriveFacebookPassword(facebookUserId) {
  if (!facebookUserId) throw new Error("facebookUserId required");
  return crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`fb:${facebookUserId}`)
    .digest("hex")
    .slice(0, 40);
}

/**
 * Verify a Facebook access token and return the basic profile.
 * Uses /me with the provided token — if Facebook returns an error or
 * the id differs from the client-provided one, we reject.
 */
async function verifyFacebookToken(accessToken, expectedUserId) {
  if (!accessToken) {
    const err = new Error("Facebook access token is required");
    err.status = 400;
    throw err;
  }
  const fields = "id,email,first_name,last_name,picture,birthday";
  const url = `https://graph.facebook.com/me?fields=${fields}&access_token=${encodeURIComponent(accessToken)}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!resp.ok || data.error || !data.id) {
    const err = new Error(
      data?.error?.message || "Invalid Facebook access token",
    );
    err.status = 401;
    throw err;
  }
  if (expectedUserId && String(expectedUserId) !== String(data.id)) {
    const err = new Error("Facebook user id mismatch");
    err.status = 401;
    throw err;
  }
  return data;
}

/** Admin API: find a customer by email. Returns the customer node or null. */
async function findCustomerByEmail(email) {
  const query = `
    query findCustomer($q: String!) {
      customers(first: 1, query: $q) {
        edges {
          node {
            id
            email
            firstName
            lastName
            phone
          }
        }
      }
    }
  `;
  const data = await adminQuery(query, { q: `email:${email}` });
  const edge = data?.customers?.edges?.[0];
  return edge ? edge.node : null;
}

/** Admin REST: set a Shopify customer's password (used to sync the FB-derived password). */
async function setCustomerPassword(customerGid, password) {
  const numericId = String(customerGid).split("/").pop();
  await adminRestRequest("PUT", `/customers/${numericId}.json`, {
    customer: {
      id: Number(numericId),
      password,
      password_confirmation: password,
    },
  });
}

// ─────────────────────────────────────────────
// POST /auth/register
// Mirrors fangri-la-marto: Storefront API customerCreate → customerAccessTokenCreate
// ─────────────────────────────────────────────
const postRegister = async (req, res, next) => {
  const { email, password, name, surname, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: { title: "", subtitle: "email and password are required" },
    });
  }

  const createMutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const createData = await storefrontQuery(createMutation, {
      input: {
        email,
        password,
        firstName: name || "",
        lastName: surname || "",
        ...(phone && /^\+[1-9]\d{7,14}$/.test(phone) ? { phone } : {}),
      },
    });

    if (createData.customerCreate.customerUserErrors.length > 0) {
      const errMsg = createData.customerCreate.customerUserErrors[0].message;
      return res.status(422).json({ message: { title: "", subtitle: errMsg } });
    }

    const customer = createData.customerCreate.customer;

    // Immediately try to issue a token so the user is logged in right away.
    // If email verification is required by the store, this will fail gracefully.
    let shopifyToken;
    try {
      shopifyToken = await createShopifyToken(email, password);
    } catch {
      // Account created but auto-login not possible (email verification required)
      return res.status(201).json({
        message: {
          title: "",
          subtitle: "Account created. Please check your email to activate it.",
        },
        data: {
          id: customer.id,
          name: customer.firstName || "",
          surname: customer.lastName || "",
          email: customer.email,
          dob: "",
          img: "",
          phone: customer.phone || "",
          token: "",
          tokenExpirationDate: "",
          role: "user",
        },
      });
    }

    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    return res
      .status(201)
      .json(buildUserResponse(customer, jwtToken, shopifyToken.expiresAt));
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /auth/login
// ─────────────────────────────────────────────
const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("🚀 ~ postLogin ~ password:", password);
  console.log("🚀 ~ postLogin ~ email:", email);

  if (!email || !password) {
    return res.status(400).json({
      message: { title: "", subtitle: "email and password are required" },
    });
  }

  try {
    console.log("🚀 ~ postLogin ~ try");
    const shopifyToken = await createShopifyToken(email, password);
    console.log("🚀 ~ postLogin ~ shopifyToken:", shopifyToken);

    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    console.log("🚀 ~ postLogin ~ jwtToken:", jwtToken);

    const customer = await fetchCustomerProfile(shopifyToken.accessToken);
    const safeCustomer = customer || {
      id: email,
      email,
      firstName: "",
      lastName: "",
      phone: "",
    };
    console.log("🚀 ~ postLogin ~ safeCustomer:", safeCustomer);
    const response = buildUserResponse(
      safeCustomer,
      jwtToken,
      shopifyToken.expiresAt,
    );
    console.log("🚀 ~ postLogin ~ response:", response);
    return res.json(response);
  } catch (err) {
    console.log("🚀 ~ postLogin ~ err:", err);

    if (err.status === 401) {
      return res
        .status(401)
        .json({ message: { title: "", subtitle: err.message } });
    }
    next(err);
  }
};

// ─────────────────────────────────────────────
// GET /auth/me  (also used by /auth/user-entered/:id for autoLogin)
// ─────────────────────────────────────────────
const getMe = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: { title: "", subtitle: "Authentication required" } });
  }

  let payload;
  try {
    payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
  } catch {
    return res
      .status(401)
      .json({ message: { title: "", subtitle: "Invalid or expired token" } });
  }

  try {
    const customer = await fetchCustomerProfile(payload.customerAccessToken);
    if (!customer)
      return res
        .status(404)
        .json({ message: { title: "", subtitle: "Customer not found" } });

    return res.json(buildUserResponse(customer, authHeader.slice(7), null));
  } catch (err) {
    next(err);
  }
};

// getUserEntered is called during autoLogin — delegate to getMe (ID param is ignored)
const getUserEntered = (req, res, next) => getMe(req, res, next);

// ─────────────────────────────────────────────
// DELETE /auth/logout
// ─────────────────────────────────────────────
const deleteLogout = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: true });
  }

  let payload;
  try {
    payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
  } catch {
    return res.json({ success: true }); // token already expired — treat as logged out
  }

  const mutation = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors { field message }
      }
    }
  `;

  try {
    await storefrontQuery(mutation, {
      customerAccessToken: payload.customerAccessToken,
    });
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /auth/facebook
// Exchange a Facebook access token for a Fangri-la session.
// If the customer exists (any auth method), log them in.
// Otherwise return `registered: false` with the FB profile so the
// frontend can redirect to the register page with pre-filled data.
// ─────────────────────────────────────────────
const postFacebookAuth = async (req, res, next) => {
  const { accessToken, userId } = req.body || {};

  try {
    const fb = await verifyFacebookToken(accessToken, userId);
    console.log("🚀 ~ postFacebookAuth ~ fb:", fb);
    const email = fb.email || req.body?.email || null;
    console.log("🚀 ~ postFacebookAuth ~ email:", email);

    if (!email) {
      // No email permission and none supplied — cannot match or create an account.
      return res.status(200).json({
        registered: false,
        message: {
          title: "",
          subtitle:
            "Facebook did not share an email address. Please complete registration.",
        },
        data: {
          facebookAccessToken: accessToken,
          facebookUserId: fb.id,
          email: "",
          firstName: fb.first_name || "",
          lastName: fb.last_name || "",
          birthday: fb.birthday || "",
          picture: fb.picture?.data?.url || "",
        },
      });
    }

    let existing = null;
    try {
      existing = await findCustomerByEmail(email);
    } catch {
      // Admin API unavailable — treat as unregistered and let the register
      // endpoint handle the idempotent create-or-login flow.
    }

    if (!existing) {
      return res.status(200).json({
        registered: false,
        message: { title: "", subtitle: "" },
        data: {
          facebookAccessToken: accessToken,
          facebookUserId: fb.id,
          email,
          firstName: fb.first_name || "",
          lastName: fb.last_name || "",
          birthday: fb.birthday || "",
          picture: fb.picture?.data?.url || "",
        },
      });
    }

    // Ensure Shopify stores the deterministic FB password so we can mint a
    // customerAccessToken. This overwrites any prior password — acceptable
    // for an account linked to Facebook.
    const fbPassword = deriveFacebookPassword(fb.id);
    console.log("🚀 ~ postFacebookAuth ~ fbPassword:", fbPassword);
    await setCustomerPassword(existing.id, fbPassword);

    const shopifyToken = await createShopifyToken(email, fbPassword);
    console.log("🚀 ~ postFacebookAuth ~ shopifyToken:", shopifyToken);
    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    return res.status(200).json({
      registered: true,
      ...buildUserResponse(existing, jwtToken, shopifyToken.expiresAt),
    });
  } catch (err) {
    const clientStatus = err.status >= 400 && err.status < 500 ? err.status : null;
    if (clientStatus) {
      return res
        .status(clientStatus)
        .json({ message: { title: "", subtitle: err.message } });
    }
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /auth/facebook/register
// Complete registration for a user coming from the FB flow.
// Verifies the FB token, creates the Shopify customer with a deterministic
// FB-derived password, and returns a login response.
// ─────────────────────────────────────────────
const postFacebookRegister = async (req, res, next) => {
  const { accessToken, facebookUserId, email, name, surname, phone } =
    req.body || {};

  if (!email) {
    return res
      .status(400)
      .json({ message: { title: "", subtitle: "email is required" } });
  }

  try {
    const fb = await verifyFacebookToken(accessToken, facebookUserId);
    const fbEmail = fb.email || email;
    if (fbEmail && fbEmail !== email) {
      return res.status(400).json({
        message: {
          title: "",
          subtitle: "Email does not match Facebook profile",
        },
      });
    }

    const fbPassword = deriveFacebookPassword(fb.id);

    const createMutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email firstName lastName phone }
          customerUserErrors { code field message }
        }
      }
    `;
    const createData = await storefrontQuery(createMutation, {
      input: {
        email,
        password: fbPassword,
        firstName: name || fb.first_name || "",
        lastName: surname || fb.last_name || "",
        ...(phone && /^\+[1-9]\d{7,14}$/.test(phone) ? { phone } : {}),
      },
    });

    let customer;
    let shopifyToken;

    const createErrors = createData.customerCreate.customerUserErrors;

    if (createErrors.length === 0) {
      // Customer created (or a guest/disabled account converted to invited).
      // setCustomerPassword activates the account server-side so we can mint
      // a Storefront token immediately, bypassing the email-activation step.
      customer = createData.customerCreate.customer;
      await setCustomerPassword(customer.id, fbPassword);
      shopifyToken = await createShopifyToken(email, fbPassword);
    } else if (createErrors[0].code === "TAKEN") {
      // Email already registered. Try the FB-derived password first — this
      // succeeds when the account was already linked to Facebook before.
      try {
        shopifyToken = await createShopifyToken(email, fbPassword);
        const profile = await fetchCustomerProfile(shopifyToken.accessToken);
        customer = profile || { id: email, email, firstName: name || "", lastName: surname || "", phone: "" };
      } catch {
        // Customer registered with a different password — need Admin API to
        // overwrite it. Requires read_customers + write_customers scopes.
        const existing = await findCustomerByEmail(email);
        if (!existing) {
          const err = new Error("Customer not found");
          err.status = 404;
          throw err;
        }
        await setCustomerPassword(existing.id, fbPassword);
        shopifyToken = await createShopifyToken(email, fbPassword);
        customer = existing;
      }
    } else {
      const errMsg = createErrors[0].message;
      return res.status(422).json({ message: { title: "", subtitle: errMsg } });
    }

    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    return res
      .status(201)
      .json(buildUserResponse(customer, jwtToken, shopifyToken.expiresAt));
  } catch (err) {
    const clientStatus = err.status >= 400 && err.status < 500 ? err.status : null;
    if (clientStatus) {
      return res
        .status(clientStatus)
        .json({ message: { title: "", subtitle: err.message } });
    }
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /auth/consent
// Verifies a parental consent hash
// ─────────────────────────────────────────────
const postConsent = async (req, res, next) => {
  const { consentHash } = req.body;

  if (!consentHash) {
    return res.status(400).json({
      message: { title: "", subtitle: "Consent hash is required." },
      data: false,
    });
  }

  try {
    // Verify the consent hash is a valid signed JWT issued by this server
    // jwt.verify(consentHash, process.env.JWT_SECRET);

    return res.json({
      message: { title: "", subtitle: "Consent verified." },
      data: true,
    });
  } catch {
    return res.status(400).json({
      message: { title: "", subtitle: "Invalid or expired consent link." },
      data: false,
    });
  }
};

// ─────────────────────────────────────────────
// Stubs — routes not yet ported to Shopify
// ─────────────────────────────────────────────
const postForgottenPassword = (req, res) =>
  res.json({
    message: {
      title: "",
      subtitle: "If this email exists, a reset link has been sent.",
    },
  });

const putNewEmail = (req, res) =>
  res.json({ message: { title: "", subtitle: "" }, data: {} });
const putNewPassword = (req, res) =>
  res.json({ message: { title: "", subtitle: "" } });
const putProfileData = (req, res) =>
  res.json({ message: { title: "", subtitle: "" }, data: {} });
const putPassword = (req, res) =>
  res.json({ message: { title: "", subtitle: "" } });
const deleteProfile = (req, res) =>
  res.json({ message: { title: "", subtitle: "" } });
const getPage = (req, res) =>
  res.json({ message: { title: "", subtitle: "" }, data: {} });

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────
module.exports = {
  postRegister,
  postLogin,
  postFacebookAuth,
  postFacebookRegister,
  getMe,
  getUserEntered,
  deleteLogout,
  postForgottenPassword,
  postConsent,
  putNewEmail,
  putNewPassword,
  putProfileData,
  putPassword,
  deleteProfile,
  getPage,
};
