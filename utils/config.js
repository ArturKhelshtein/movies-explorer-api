const { NODE_ENV, DB_URL } = process.env;
const JWT_SECRET = (NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret');

module.exports = { NODE_ENV, JWT_SECRET, DB_URL };
