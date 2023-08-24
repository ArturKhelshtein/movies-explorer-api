const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('./config');

function generateToken(payload) {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (error) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
