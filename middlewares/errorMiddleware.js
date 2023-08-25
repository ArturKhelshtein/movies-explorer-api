const errorMiddleware = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на сервере' : error.message;

  res.status(statusCode).send({ message });

  return next();
};

module.exports = { errorMiddleware };
