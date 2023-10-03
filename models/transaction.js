const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  reference: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  ipAddress: {
    type: String,
  },
  currency: {
    type: String,
  },
  channel: {
    type: String,
  },
  transactionId: {
    type: Number,
  },
  paidAt: {
    type: Date,
  },
});

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
