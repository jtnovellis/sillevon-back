const {
  signIn,
  signUp,
  updateUserPhotos,
  updateUserData,
} = require('./user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUpHandle = async (req, res) => {
  const userData = req.body;
  try {
    const encPassword = await bcrypt.hash(userData.password, 10);
    const user = await signUp(userData, encPassword);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60000,
    });
    return res.status(201).json({
      message: 'User created successfully',
      data: {
        email: user.email,
        token,
        name: user.name,
        imagesDone: user.imagesDone,
      },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not be created', error: err });
  }
};

const signInHandle = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signIn(email);
    if (!user) {
      throw new Error('Some of your credentials are invalid');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Some of your credentials are invalid');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60000,
    });
    if (user.mode === 'customer') {
      return res.status(200).json({
        message: 'Login successfully',
        data: {
          token,
          email: user.email,
          name: user.name,
          imagesDone: user.imagesDone,
          mode: user.mode,
        },
      });
    } else {
      return res.status(200).json({
        message: 'Login successfully',
        data: {
          token,
          email: user.email,
          name: user.name,
          imagesDone: user.imagesDone,
          skills: user.skills,
          location: user.location,
          mode: user.mode,
          city: user.city,
        },
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'User could not login', error: err.message });
  }
};

const updatePhotoshandler = async (req, res) => {
  const userData = req.body;
  try {
    const userUpdated = await updateUserPhotos(userData);
    return res.status(200).json({ message: 'User updated', data: userUpdated });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not be update', data: e });
  }
};

const updateUserDataHandler = async (req, res) => {
  const userId = req.user;
  const userData = req.body;
  try {
    const user = await updateUserData(userId, userData);
    return res.status(200).json({
      message: 'User updated',
      data: {
        mode: user.mode,
        city: user.city,
        location: user.location,
        skills: user.skills,
      },
    });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'User could not be update', data: e });
  }
};

module.exports = {
  signInHandle,
  signUpHandle,
  updatePhotoshandler,
  updateUserDataHandler,
};
