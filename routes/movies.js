const router = require('express').Router();

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');
const { movieValidationBodyPost, movieValidationParamsId } = require('../utils/validationJoi');

router.get('/', getMovies);

router.post('/', movieValidationBodyPost, postMovies);

router.delete('/:_id', movieValidationParamsId, deleteMovies);

module.exports = router;
