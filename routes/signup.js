const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { signUp } = require('../controllers/users');
const { regexEmail } = require('../utils/regexp');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .pattern(regexEmail),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
}), signUp);

module.exports = router;
