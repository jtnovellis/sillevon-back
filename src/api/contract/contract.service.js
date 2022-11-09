const Contract = require('./contract.model');

function createContract(name, clientId, artistId) {
  return Contract.create({
    contractName: name,
    client: clientId,
    artist: artistId,
  });
}

function updateContract(id, data) {
  return Contract.findByIdAndUpdate(id, data, { new: true })
    .populate('client')
    .populate('artist');
}

function getContracts(name) {
  return Contract.find({ contractName: name })
    .populate('client')
    .populate('artist');
}

module.exports = { createContract, updateContract, getContracts };
