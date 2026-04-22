module.exports = function(err, req, res, next) {
  console.error(err.message, err);
  return res.status(500).json({
    message: { title: '', subtitle: 'Something went wrong. Please try again.' },
  });
};
