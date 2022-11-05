const Router = require('express');
const {
  signInHandle,
  signUpHandle,
  updatePhotoshandler,
  updateUserDataHandler,
  oneUserHandler,
  dataOfUserHandler,
  allArtistsUserHandler,
} = require('./user.controller');
const { formData } = require('../../utils/formData');
const { authenticate } = require('../../utils/auth');

const router = Router();

router.post('/signup', signUpHandle);
router.post('/signin', signInHandle);
router.post('/update/form-data', authenticate, formData, updatePhotoshandler);
router.put('/update', authenticate, updateUserDataHandler);
router.get('/datauser', authenticate, dataOfUserHandler);
router.get('/artist-recomended-data', allArtistsUserHandler);
router.get('/artist-initial-data', allArtistsUserHandler);
router.get('/artist-email/:email', oneUserHandler);

module.exports = router;
