const {
  createContract,
  updateContract,
  getContract,
} = require('./contract.service');
const User = require('../user/user.model');
async function createContractHandler(req, res) {
  try {
    const data = req.body;
    const id = req.user;
    const { artistId } = req.params;
    const artist = await User.findOne({ email: artistId });
    if (!artist) {
      throw new Error('Does not exist the artist');
    }
    const contract = await createContract(data, id, artist._id);
    return res
      .status(201)
      .json({ message: 'Contract created', data: contract });
  } catch (e) {
    return res.status(400).json({ message: 'Contract not created', data: e });
  }
}

async function updateContractHandler(req, res) {
  try {
    const data = req.body;
    const { contractId } = req.params;
    const contract = updateContract(contractId, data);
    return res
      .status(200)
      .json({ message: 'Contract updated', data: contract });
  } catch (e) {
    return res.status(400).json({ message: 'Contract not updated', data: e });
  }
}

async function getContractHandler(req, res) {
  try {
    const { contractId } = req.params;
    const contract = await getContract(contractId);
    return res.status(200).json({ message: 'Contract found', data: contract });
  } catch (e) {
    return res.status(400).json({ message: 'Contract not found', data: e });
  }
}

module.exports = {
  createContractHandler,
  updateContractHandler,
  getContractHandler,
};
