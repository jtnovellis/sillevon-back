const Router = require('express');
const { signInHandle, signUpHandle } = require('./user.controller');

const router = Router();

router.post('/signup', signUpHandle);
router.post('/signin', signInHandle);

module.exports = router;
