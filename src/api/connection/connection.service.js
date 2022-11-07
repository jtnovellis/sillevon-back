const Connection = require('./connection.model');

function createConnection(userA, userB) {
  return Connection.create({ userA: userA._id, userB: userB._id });
}

function updateConnection(id, data) {
  return Connection.findByIdAndUpdate(id, data, { new: true }).populate(
    'userB'
  );
}

module.exports = { createConnection, updateConnection };
