const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./app.js');
const { DB_URL } = require('./utils/config');

const request = supertest(app);

const userValidData = { email: abc@yandex.ru, password: abc }

const userInvalidEmail
const userInvalidPassword
const userInvalidName

describe('Защита авторизацией', () => {
  it('Возвращает 401-й ответ по запросу к "/" и требует авторизации', () => {
    return request.get('/').then((response) => {
      expect(response.status).toBe(401);
      expect(response.headers['content-type']).toMatch('application/json');
    });
  });
});

describe('Создание пользователя', () => {
  it('При создания пользователя с корректными данными статус 200', () => {
    return request.post('/signup').then((response) => {
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toMatch('application/json');
    });
  });
  it('При создания пользователя без body статус 400', () => {
    return request.post('/signup').then((response) => {
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toMatch('application/json');
    });
  });
  it('При создания пользователя без поля email статус 400', () => {
    return request.post('/signup').then((response) => {
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toMatch('application/json');
    });
  });
});