const router = require('express').Router();

const { getUserMe, patchUserMe } = require('../controllers/users');
const { userValidationBodyEmailName } = require('../utils/validationJoi');

router.get('/me', getUserMe);

router.patch('/me', userValidationBodyEmailName, patchUserMe);

module.exports = router;
