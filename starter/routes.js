
const fangrilaRоutesEn = require('../projects/fangri-la/en');

const error = require('../middleware/error');

module.exports = (app) => {
  app.post('/', (req, res, next) => {
    return res.status(200).json({ init: true });
  });

  app.use('/api/fangri-la/en', fangrilaRоutesEn);

  app.use(error);
};
