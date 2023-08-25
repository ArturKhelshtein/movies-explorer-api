const router = require('express').Router();

const { signOut } = require('../controllers/users');

router.get('/', signOut);

module.exports = router;
