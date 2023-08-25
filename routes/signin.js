const router = require('express').Router();

const { signIn } = require('../controllers/users');
const { userValidationBodyEmailPassword } = require('../utils/validationJoi');

router.post('/', userValidationBodyEmailPassword, signIn);

module.exports = router;
