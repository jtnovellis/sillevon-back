const User = require('./user.model');

const signUp = (user, encPassword) => {
  return User.create({ ...user, password: encPassword });
};

const signIn = (email) => {
  return User.findOne({ email });
};

const updateUserPhotos = async (data) => {
  const { email, avatar, background } = data;
  const user = await User.findOne({ email });
  return await User.findByIdAndUpdate(
    user.id,
    { imagesDone: { avatar, background } },
    { new: true }
  );
};

const updateUserData = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { signUp, signIn, updateUserPhotos, updateUserData };
