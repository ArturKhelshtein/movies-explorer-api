require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const ErrorNotFound = require('./errors/error-not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
const { DB_URL } = require('./utils/config');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(cors({ origin: ['http://arturkhelshtein.nomoredomainsicu.ru', 'https://arturkhelshtein.nomoredomainsicu.ru'], credentials: true, maxAge: 30 }));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookies());
app.use(requestLogger);
app.use(router);
app.use((req, _res, next) => next(new ErrorNotFound(`Ресурс по адресу ${req.path} не найден`)));

app.use(errorLogger);

app.use(errors());
app.use(errorMiddleware);

module.exports = app;
