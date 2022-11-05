const Post = require('./post.model');

function createPost(data, userId) {
  return Post.create({ ...data, user: userId });
}

function getPostsByUser(userId) {
  return Post.find({ user: userId });
}

function updatePost(id, data) {
  return Post.findByIdAndUpdate(id, data, { new: true });
}

module.exports = { createPost, getPostsByUser, updatePost };
