const router = require('express').Router();

const { signUp } = require('../controllers/users');
const { userValidationBodyEmailPasswordName } = require('../utils/validationJoi');

router.post('/', userValidationBodyEmailPasswordName, signUp);

module.exports = router;
