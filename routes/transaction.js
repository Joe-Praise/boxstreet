const express = require("express");
const Transaction = require("../models/transaction");
const { Protect } = require("../middleware/auth");
const {
  initiatePaymentService,
  paystackWebhookService,
} = require("../utils/payment");
let app = express.Router();

app.post("/initiate-payment", Protect, initiatePaymentService);

// TODO: this route is not authomatically called by paystack test webhook url
// app.post("/webhook", paystackWebhookService);

app.post("/getstatus", async (req, res) => {
  try {
    res.send(req.query);
    // const transaction = await Transaction.findOne({
    //   reference: req.data.reference,
    // });
    // const updateObj = {
    //   ipAddress: req.data.ip_address,
    //   currency: req.data.currency,
    //   channel: req.data.channel,
    //   transactionId: req.data.id,
    //   status: req.data.status,
    //   paidAt: req.data.paid_at,
    // };

    // const data = transaction._doc;
    // transaction.overwrite({ ...data, ...updateObj });
    // transaction.save();

    // console.log(req.body.data);
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     data,
    //   },
    // });
    // console.log(user);
  } catch (err) {
    return res.status(402).json({
      err: "unable to get payment information",
    });
  }
});

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
