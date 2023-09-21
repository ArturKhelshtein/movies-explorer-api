const mongoose = require('mongoose');
const { regexEmail } = require('../utils/regexp');
const bcrypt = require('bcryptjs');

const ErrorUnauthorized = require('../errors/error-unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => !!v.match(regexEmail),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" — 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" — 30 символов'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized('Не верное имя пользователя или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized('Не верное имя пользователя или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
