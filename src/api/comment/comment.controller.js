const { createComment } = require('./comment.service');

async function createCommentHandler(req, res) {
  try {
    const id = req.user;
    const { postId } = req.params;
    const data = req.body;
    const comment = await createComment(id, postId, data);
    return res.status(201).json({ message: 'Comment created', data: comment });
  } catch (e) {
    return res.status(400).json({ message: 'Comment not created', data: e });
  }
}

module.exports = { createCommentHandler };
