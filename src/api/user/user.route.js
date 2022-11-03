const Router = require('express');
const {
  signInHandle,
  signUpHandle,
  updatePhotoshandler,
  updateUserDataHandler,
} = require('./user.controller');
const { formData } = require('../../utils/formData');
const { authenticate } = require('../../utils/auth');

const router = Router();

router.post('/signup', signUpHandle);
router.post('/signin', signInHandle);
router.post('/update/form-data', authenticate, formData, updatePhotoshandler);
router.put('/update', authenticate, updateUserDataHandler);

module.exports = router;
