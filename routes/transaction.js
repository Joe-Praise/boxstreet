const express = require("express");
const Transaction = require("../models/transaction");
const { Protect } = require("../middleware/auth");
const {
  initiatePaymentService,
  paystackWebhookService,
} = require("../utils/payment");
let app = express.Router();

app.post("/initiate-payment", Protect, initiatePaymentService);

app.post("/webhook", paystackWebhookService);

app.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;
