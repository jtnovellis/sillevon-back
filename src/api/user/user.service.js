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

function dataOfUser(id) {
  return User.findById(id).populate({
    path: 'posts',
    populate: [
      {
        path: 'comments',
        model: 'Comment',
        populate: [{ path: 'author', model: 'User' }],
      },
    ],
  });
}

function allArtistsUser(limit, page) {
  return User.paginate(
    { mode: 'artist/band' },
    {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
    }
  );
}

function oneUser(email) {
  return User.findOne({ email }).populate({
    path: 'posts',
    populate: [
      {
        path: 'comments',
        model: 'Comment',
        populate: [{ path: 'author', model: 'User' }],
      },
    ],
  });
}

function filteredArtist(city, limit, page, instrument, genre) {
  if (city && instrument && genre) {
    return User.paginate(
      { city, instrument, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (city && instrument) {
    return User.paginate(
      { city, instrument, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (city && genre) {
    return User.paginate(
      { city, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (genre && instrument) {
    return User.paginate(
      { instrument, genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (city) {
    return User.paginate(
      { city, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (genre) {
    return User.paginate(
      { genre, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  } else if (instrument) {
    return User.paginate(
      { instrument, mode: 'artist/band' },
      {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
      }
    );
  }
}

module.exports = {
  signUp,
  dataOfUser,
  signIn,
  updateUserPhotos,
  filteredArtist,
  updateUserData,
  oneUser,
  allArtistsUser,
};
