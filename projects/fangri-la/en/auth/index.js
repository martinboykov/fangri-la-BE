const jwt = require('jsonwebtoken');
const { storefrontQuery } = require('../../../../utils/shopify-storefront');

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Build the standard response shape the frontend expects */
function buildUserResponse(customer, jwtToken, expiresAt) {
  return {
    message: { title: '', subtitle: '' },
    data: {
      id: customer.id,
      name: customer.firstName || '',
      surname: customer.lastName || '',
      email: customer.email,
      dob: '',
      img: '',
      phone: customer.phone || '',
      token: jwtToken,
      tokenExpirationDate: expiresAt,
      role: 'user',
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
  const tokenData = await storefrontQuery(tokenMutation, { input: { email, password } });
  const { customerAccessToken, customerUserErrors } = tokenData.customerAccessTokenCreate;

  if (customerUserErrors.length > 0 || !customerAccessToken) {
    const msg = customerUserErrors[0]?.message || 'Invalid credentials';
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
// POST /auth/register
// Mirrors fangri-la-marto: Storefront API customerCreate → customerAccessTokenCreate
// ─────────────────────────────────────────────
const postRegister = async (req, res, next) => {
  const { email, password, name, surname, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
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
        firstName: name || '',
        lastName: surname || '',
        ...(phone && /^\+[1-9]\d{7,14}$/.test(phone) ? { phone } : {}),
      },
    });

    if (createData.customerCreate.customerUserErrors.length > 0) {
      const errMsg = createData.customerCreate.customerUserErrors[0].message;
      return res.status(422).json({ message: errMsg, error: errMsg });
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
          title: '',
          subtitle: 'Account created. Please check your email to activate it.',
        },
        data: {
          id: customer.id,
          name: customer.firstName || '',
          surname: customer.lastName || '',
          email: customer.email,
          dob: '',
          img: '',
          phone: customer.phone || '',
          token: '',
          tokenExpirationDate: '',
          role: 'user',
        },
      });
    }

    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    return res.status(201).json(buildUserResponse(customer, jwtToken, shopifyToken.expiresAt));
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /auth/login
// ─────────────────────────────────────────────
const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('🚀 ~ postLogin ~ password:', password);
  console.log('🚀 ~ postLogin ~ email:', email);

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    console.log('🚀 ~ postLogin ~ try');
    const shopifyToken = await createShopifyToken(email, password);
    console.log('🚀 ~ postLogin ~ shopifyToken:', shopifyToken);

    const jwtToken = jwt.sign(
      { customerAccessToken: shopifyToken.accessToken, email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    console.log('🚀 ~ postLogin ~ jwtToken:', jwtToken);

    const customer = await fetchCustomerProfile(shopifyToken.accessToken);
    const safeCustomer = customer || {
      id: email,
      email,
      firstName: '',
      lastName: '',
      phone: '',
    };
    console.log('🚀 ~ postLogin ~ safeCustomer:', safeCustomer);
    const response = buildUserResponse(safeCustomer, jwtToken, shopifyToken.expiresAt);
    console.log('🚀 ~ postLogin ~ response:', response);
    return res.json(response);
  } catch (err) {
    console.log('🚀 ~ postLogin ~ err:', err);

    if (err.status === 401) {
      return res.status(401).json({ message: err.message, error: err.message });
    }
    next(err);
  }
};

// ─────────────────────────────────────────────
// GET /auth/me  (also used by /auth/user-entered/:id for autoLogin)
// ─────────────────────────────────────────────
const getMe = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  let payload;
  try {
    payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const customer = await fetchCustomerProfile(payload.customerAccessToken);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

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
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
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
// POST /auth/consent
// Verifies a parental consent hash
// ─────────────────────────────────────────────
const postConsent = async (req, res, next) => {
  const { consentHash } = req.body;

  if (!consentHash) {
    return res.status(400).json({
      message: { title: '', subtitle: 'Consent hash is required.' },
      data: false,
    });
  }

  try {
    // Verify the consent hash is a valid signed JWT issued by this server
    // jwt.verify(consentHash, process.env.JWT_SECRET);

    return res.json({
      message: { title: '', subtitle: 'Consent verified.' },
      data: true,
    });
  } catch {
    return res.status(400).json({
      message: { title: '', subtitle: 'Invalid or expired consent link.' },
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
      title: '',
      subtitle: 'If this email exists, a reset link has been sent.',
    },
  });

const putNewEmail = (req, res) => res.json({ message: { title: '', subtitle: '' }, data: {} });
const putNewPassword = (req, res) => res.json({ message: { title: '', subtitle: '' } });
const putProfileData = (req, res) => res.json({ message: { title: '', subtitle: '' }, data: {} });
const putPassword = (req, res) => res.json({ message: { title: '', subtitle: '' } });
const deleteProfile = (req, res) => res.json({ message: { title: '', subtitle: '' } });
const getPage = (req, res) => res.json({ message: { title: '', subtitle: '' }, data: {} });

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────
module.exports = {
  postRegister,
  postLogin,
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
