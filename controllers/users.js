const bcrypt = require('bcryptjs');
const { OK, CREATED } = require('../utils/status-code');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const ErrorBadRequest = require('../errors/error-bad-request');
const ErrorInternalServer = require('../errors/error-internal-server');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorConflictRequest = require('../errors/error-conflict-request');
const ErrorUnauthorized = require('../errors/error-unauthorized');

async function signUp(req, res, next) {
  const { email, password, name } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    return res.status(CREATED).send({
      user: {
        _id: user._id, email: user.email, name: user.name,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ErrorBadRequest(`Ошибка при вводе данных: ${error}`));
    }
    if (error.keyValue.email) {
      return next(new ErrorConflictRequest(`Ошибка, email: «${email}» уже используется`));
    }
    return next(new ErrorInternalServer('Ошибка на сервере, при запросе пользователей'));
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const payload = { _id: user._id };
    const token = generateToken(payload);
    res.cookie('jwt', token, {
      maxAge: 604800,
      httpOnly: true,
      sameSite: true,
    });
    return res.status(OK).send({ message: 'Авторицазия успешна', user: payload });
  } catch (error) {
    return next(new ErrorUnauthorized('Пользователь не найден'));
  }
}

function signOut(_req, res) {
  return res.clearCookie('jwt').send({ message: 'Выполнен выход из системы' });
}

function getUserMe(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new ErrorNotFound('Пользователь с таким id не найден'))
    .then((user) => res.status(OK).send({ dataUser: user }))
    .catch((error) => {
      if (error.statusCode === 404) {
        return next(error);
      }
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Ошибка при вводе данных'));
      }
      return next(new ErrorInternalServer('Ошибка на сервере, при запросе пользователя'));
    });
}

function patchUserMe(req, res, next) {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ dataUser: user }))
    .catch((error) => {
      if (error.keyValue.email && error.codeName === 'DuplicateKey') {
        return next(new ErrorBadRequest(`Email «${error.keyValue.email}» уже используется`));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest(`Ошибка при вводе данных: ${error}`));
      }
      return next(new ErrorInternalServer('Ошибка на сервере, при запросе пользователя'));
    });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getUserMe,
  patchUserMe,
};
