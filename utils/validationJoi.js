const { celebrate, Joi } = require('celebrate');
const { regexEmail, regexUrl } = require('./regexp');

const userValidationBodyEmailPasswordName = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .pattern(regexEmail),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
});

const userValidationBodyEmailPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().min(2)
      .max(30)
      .pattern(regexEmail),
    password: Joi.string().required().min(2),
  }),
});

const userValidationBodyEmailName = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .pattern(regexEmail),
    name: Joi.string().required().min(2).max(30),
  }),
});

const movieValidationBodyPost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexUrl),
    trailerLink: Joi.string().required().pattern(regexUrl),
    thumbnail: Joi.string().required().pattern(regexUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieValidationParamsMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  userValidationBodyEmailPasswordName,
  userValidationBodyEmailPassword,
  userValidationBodyEmailName,
  movieValidationBodyPost,
  movieValidationParamsMovieId,
};
