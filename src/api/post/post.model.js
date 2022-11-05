const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    urlImage: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
