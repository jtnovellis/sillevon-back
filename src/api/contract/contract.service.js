const Contract = require('./contract.model');

function createContract(data, clientId, artistId) {
  return Contract.create({ ...data, client: clientId, artist: artistId });
}

function updateContract(id, data) {
  return Contract.findByIdAndUpdate(id, data, { new: true });
}

function getContract(id) {
  return Contract.findById(id);
}

module.exports = { createContract, updateContract, getContract };
