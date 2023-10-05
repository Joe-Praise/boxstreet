const express = require("express");
const Transaction = require("../models/transaction");
const { Protect } = require("../middleware/auth");
const axios = require("axios");
const {
  initiatePaymentService,
  paystackWebhookService,
} = require("../utils/payment");
let app = express.Router();
require("dotenv").config();

app.post("/initiate-payment", Protect, initiatePaymentService);

// TODO: this route is not authomatically called by paystack test webhook url
// app.post("/webhook", paystackWebhookService);

app.get("/getstatus", async (req, res) => {
  try {
    let { reference } = req.query;
    reference = "BS-TF3617371821";
    // res.send();
    const transaction = await Transaction.findOne({
      reference,
    });

    console.log(reference, process.env.PAYSTACK_API_KEY);

    // const instance = axios.create({
    //   baseURL: process.env.PAYSTACK_GETSTATUS_HOSTNAME,
    //   headers: {
    //     Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
    //   },
    // });
    // const response = await instance.get(
    //   process.env.PAYSTACK_GETSTATUS_PATH + `${reference}`
    // );
    // ("api.paystack.co");
    // ("/transaction/verify/");
    // let url = "https://api.paystack.co/transaction";
    let url = "https://api.paystack.co/transaction/verify/" + `${reference}`;
    console.log(url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    });
    const data = response.data;

    res.json(data);
    // const updateObj = {
    //   ipAddress: data.ip_address,
    //   currency: data.currency,
    //   channel: data.channel,
    //   transactionId: data.id,
    //   status: data.status,
    //   paidAt: data.paid_at,
    // };
    // console.log(updateObj);
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
