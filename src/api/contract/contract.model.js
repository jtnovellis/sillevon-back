const { Schema, model } = require('mongoose');

const contractSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    schedule: Date,
    price: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contract = model('Contract', contractSchema);

module.exports = Contract;
