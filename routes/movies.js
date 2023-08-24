const router = require('express').Router();

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');
const { movieValidationBodyPost, movieValidationParamsMovieId } = require('../utils/validationJoi');

router.get('/', getMovies);

router.post('/', movieValidationBodyPost, postMovies);

router.delete('/:movieId', movieValidationParamsMovieId, deleteMovies);

module.exports = router;
