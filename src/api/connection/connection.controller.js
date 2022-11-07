const User = require('../user/user.model');
const { createConnection, updateConnection } = require('./connection.service');

async function createConnectionHandler(req, res) {
  try {
    const id = req.user;
    const data = req.body;
    const userA = await User.findById(id);
    const userB = await User.findOne({ email: data.email });
    const connection = await createConnection(userA, userB);
    userA.connections.push(connection);
    await userA.save({ validateBeforeSave: false });
    userB.connections.push(connection);
    await userB.save({ validateBeforeSave: false });
    return res
      .status(201)
      .json({ message: 'Connection created', data: connection });
  } catch (e) {
    return res.status(400).json({ message: 'Connection not created', data: e });
  }
}

async function updateConnectionHandler(req, res) {
  try {
    const data = req.body;
    const { connectionId } = req.params;
    const connection = await updateConnection(connectionId, data);
    return res
      .status(200)
      .json({ message: 'Connection updated', data: connection });
  } catch (e) {
    return res.status(400).json({ message: 'Connection updated', data: e });
  }
}

module.exports = { createConnectionHandler, updateConnectionHandler };
