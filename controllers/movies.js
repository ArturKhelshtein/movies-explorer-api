const { OK, CREATED } = require('../utils/status-code');
const Movie = require('../models/movie');
const ErrorInternalServer = require('../errors/error-internal-server');
const ErrorBadRequest = require('../errors/error-bad-request');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorForbidden = require('../errors/error-forbidden');

function getMovies(req, res, next) {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate(['owner'])
    .then((movies) => res.status(OK).send({ dataMovies: movies }))
    .catch(() => next(new ErrorInternalServer('Ошибка на сервере, при запросе фильмов')));
}

function postMovies(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((result) => result.populate(['owner']))
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest(`Ошибка при вводе данных: ${error}`));
      }
      return next(error);
    });
}

async function deleteMovies(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;
  try {
    const movieData = await Movie.findOne({ movieId }).lean();
    const ownerId = movieData?.owner.valueOf();

    if (!movieId || !movieData) {
      return next(new ErrorNotFound('Фильм с таким id не найден'));
    }

    if (userId === ownerId) {
      return await Movie.findByIdAndDelete(movieData._id)
        .orFail(new ErrorNotFound('Фильм с таким id не найден'))
        .then((movie) => res.send({ message: 'Фильм удален', movieData: movie }))
        .catch((error) => {
          if (error.name === 'CastError') {
            return next(new ErrorBadRequest('Ошибка при вводе данных'));
          }
          return next(error);
        });
    }
    return next(new ErrorForbidden('Ошибка, запрещено удалять чужие фильмы'));
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};
