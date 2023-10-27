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
  cinema_id: {
    type: mongoose.Types.ObjectId,
    ref: "cinemas",
  },
  branch_id: {
    type: mongoose.Types.ObjectId,
    ref: "branches",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  ipAddress: {
    type: String,
  },
  currency: {
    type: String,
  },
  channel: {
    type: String,
    enum: ["card", "cash"],
  },
  transactionId: {
    type: Number,
  },
  paidAt: {
    type: Date,
  },
  message: {
    type: String,
  },
});

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
