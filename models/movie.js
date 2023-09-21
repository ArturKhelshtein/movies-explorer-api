const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'поле "country" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'поле "director" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'поле "duration" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'поле "year" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'поле "description" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'поле "image" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'поле "trailerLink" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'поле "thumbnail" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: String,
      required: [true, 'поле "owner" должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'поле "movieId" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'поле "nameRU" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'поле "nameEN" должно быть заполнено'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('movie', movieSchema);
