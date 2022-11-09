const {
  createContract,
  updateContract,
  getContracts,
} = require('./contract.service');
const User = require('../user/user.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createContractHandler(req, res) {
  let contracts = [];
  try {
    const { artists, name } = req.body;
    const id = req.user;
    const client = await User.findById(id);
    for (let i = 0; i < artists.length; i++) {
      const element = artists[i].value;
      const artist = await User.findOne({ email: element });
      if (!artist) {
        throw new Error('Does not exist the artist');
      }
      const contract = await createContract(name, id, artist._id);
      artist.contracts.push(contract);
      await artist.save({ validateBeforeSave: false });
      client.contracts.push(contract);
      await client.save({ validateBeforeSave: false });
      contracts = [...contracts, contract];
    }
    return res
      .status(201)
      .json({ message: 'Contracts created', data: contracts });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Contracts could not been created', data: e });
  }
}

async function updateContractHandler(req, res) {
  const { time, schedule, contracts, recommendations, repertoire } = req.body;
  const newData = {
    time,
    schedule,
    recommendations,
    repertoire,
  };
  let newContracts = [];
  try {
    for (let i = 0; i < contracts.length; i++) {
      const contractId = contracts[i]._id;
      const contract = await updateContract(contractId, newData);
      newContracts = [...newContracts, contract];
    }
    return res
      .status(200)
      .json({ message: 'Contracts updated', data: newContracts });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Contracts could not been updated', data: e });
  }
}

async function lastUpdateContractHandler(req, res) {
  const { price, rehearsalSchedule, address, addressInfo, contracts } =
    req.body;
  const newData = {
    price,
    rehearsalSchedule,
    address,
    addressInfo,
  };
  let newContracts = [];
  try {
    for (let i = 0; i < contracts.length; i++) {
      const contractId = contracts[i]._id;
      const contract = await updateContract(contractId, newData);
      newContracts = [...newContracts, contract];
    }
    return res
      .status(200)
      .json({ message: 'Contracts updated', data: newContracts });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Contracts could not been updated', data: e });
  }
}

async function getContractHandler(req, res) {
  try {
    const { contractName } = req.params;
    const contracts = await getContracts(contractName);
    return res
      .status(200)
      .json({ message: 'Contracts found', data: contracts });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Contracts could not been found', data: e });
  }
}

async function acceptContractHandler(req, res) {
  const { contractId } = req.params;
  const { isAccepted } = req.body;
  try {
    const contract = await updateContract(contractId, { isAccepted });
    return res
      .status(200)
      .json({ message: 'Contracts updated', data: contract });
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Contract could not been updated', data: e });
  }
}

async function createCheckout(req, res) {
  const { contracts } = req.body;
  for (let i = 0; i < contracts.length; i++) {
    const element = contracts[i]._id;
    await updateContract(element, { isPaid: true });
  }
  const calculateOrderAmount = (ctrs) => {
    const total = ctrs[0].price;
    return total * 100;
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(contracts),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = {
  createContractHandler,
  updateContractHandler,
  getContractHandler,
  createCheckout,
  lastUpdateContractHandler,
  acceptContractHandler,
};
