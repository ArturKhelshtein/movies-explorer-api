const router = require('express').Router();

const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const signOutRouter = require('./signout');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', signUpRouter);
router.use('/signin', signInRouter);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', signOutRouter);

module.exports = router;
