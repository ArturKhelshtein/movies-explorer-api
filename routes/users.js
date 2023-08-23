const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserMe, patchUserMe } = require('../controllers/users');
const { regexEmail } = require('../utils/regexp');

router.get('/me', getUserMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30)
        .pattern(regexEmail),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  patchUserMe,
);

module.exports = router;
