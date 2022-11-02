const { Schema, model, models } = require('mongoose');

/* const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

  match: [passwordRegex, 'Special character, number and capital letter'],
 */
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please fill a valid email address'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'It is already exist a user with this email',
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    terms: {
      type: Boolean,
      required: true,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'customer',
    },
    city: {
      type: String,
    },
    imagesDone: {
      avatar: {
        type: String,
        required: false,
        default:
          'https://res.cloudinary.com/dhrs1koll/image/upload/v1667361279/SillevonPosts/blank-profile-picture-g7b6595fac_640_tbldur.png',
      },
      background: {
        type: String,
        required: false,
        default:
          'https://res.cloudinary.com/dhrs1koll/image/upload/v1667361272/SillevonPosts/background-g4cd895aa3_1280_lqqr8p.png',
      },
    },
    location: {
      lat: Number,
      lng: Number,
    },
    skills: {
      improvisation: Number,
      show: Number,
      repertoire: Number,
      versatility: Number,
      instrumentation: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model('User', userSchema);

module.exports = User;
