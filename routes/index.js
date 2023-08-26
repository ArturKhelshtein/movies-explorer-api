const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const {
  signUp,
  signIn,
  getUserMe,
  patchUserMe,
  signOut,
} = require('../controllers/users');
const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');

const {
  userValidationBodyEmailPasswordName,
  userValidationBodyEmailPassword,
  userValidationBodyEmailName,
  movieValidationBodyPost,
  movieValidationParamsId,
} = require('../utils/validationJoi');

const ErrorNotFound = require('../errors/error-not-found');

router.post('/signup', userValidationBodyEmailPasswordName, signUp);
router.post('/signin', userValidationBodyEmailPassword, signIn);

router.use(auth);
router.get('/users/me', getUserMe);
router.patch('/users/me', userValidationBodyEmailName, patchUserMe);
router.get('/movies', getMovies);
router.post('/movies', movieValidationBodyPost, postMovies);
router.delete('/movies/:_id', movieValidationParamsId, deleteMovies);
router.get('/signout', signOut);

router.use((req, _res, next) => next(new ErrorNotFound(`Ресурс по адресу ${req.path} не найден`)));

module.exports = router;
