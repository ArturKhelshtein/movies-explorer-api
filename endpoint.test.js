/* eslint-disable no-undef */
const supertest = require('supertest');
// const mongoose = require('mongoose');
const app = require('./app');
// const { DB_URL } = require('./utils/config');
const { regexEmail } = require('./utils/regexp');

const request = supertest(app);

const userValidData = { email: 'mail@yandex.ru', password: '123', name: 'abc' };

describe('Защита авторизацией', () => {
  it('Возвращает 401-й ответ по запросу к "/" и требует авторизации', () => request.get('/').then((response) => {
    expect(response.status).toBe(401);
    expect(response.headers['content-type']).toMatch('application/json');
  }));
});

describe('Валидация пользовательских данных', () => {
  it('Валидные данные проходят проверку должна проверять, что email валиден', () => {
    expect(userValidData.email).toMatch(regexEmail);
    expect(userValidData.name).toBeGreaterThanOrEqual(2).toBeLessThanOrEqual(30);
  });
});

describe('Создание пользователя', () => {
  it('При создания пользователя с корректными данными статус 200', () => request.post('/signup').then((response) => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  }));
  it('При создания пользователя без body статус 400', () => request.post('/signup').then((response) => {
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch('application/json');
  }));
  it('При создания пользователя без поля email статус 400', () => request.post('/signup').then((response) => {
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch('application/json');
  }));
});
