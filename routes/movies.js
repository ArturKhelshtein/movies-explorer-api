const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');
const { regexUrl, regexInt16 } = require('../utils/regexp');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regexUrl),
      trailerLink: Joi.string().required().pattern(regexUrl),
      thumbnail: Joi.string().required().pattern(regexUrl),
      movieId: Joi.string().required().min(24).max(24)
        .pattern(regexInt16),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  postMovies,
);

router.delete('/:movieId', deleteMovies);

module.exports = router;
