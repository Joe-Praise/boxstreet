const express = require("express");
const Transaction = require("../models/transaction");
const Bookings = require("../models/booking");
// const { Protect } = require("../middleware/auth");
const axios = require("axios");
const { initiatePaymentService } = require("../utils/payment");
let app = express.Router();
require("dotenv").config();

app.post("/initiate-payment", initiatePaymentService);

app.get("/getstatus", async (req, res) => {
  try {
    let { reference } = req.query;

    const transaction = await Transaction.findOne({
      reference,
    });
    const booking = await Bookings.findOne({
      reference,
    });

    let url = process.env.PAYSTACK_GETSTATUS_URL + `${reference}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    });

    const payload = response.data;

    const updateObj = {
      ipAddress: payload.data.ip_address,
      currency: payload.data.currency,
      channel: payload.data.channel,
      transactionId: payload.data.id,
      status: payload.data.status,
      paidAt: payload.data.paid_at,
      message: payload.data.message,
    };

    const data = transaction._doc;
    transaction.overwrite({ ...data, ...updateObj });
    transaction.save();

    res.status(200).render("reciept", {
      email: transaction.email,
      amount: transaction.amount,
      status: updateObj.status,
      date: updateObj.paidAt,
      transactionId: updateObj.transactionId,
    });
  } catch (err) {
    return res.status(402).json({
      err: "unable to get payment information",
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user_id");
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

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Transaction.findById(id);

    if (!payment)
      return res
        .status(404)
        .json({ msg: "The id supplied does not exist", code: 404 });

    let data = payment._doc;
    payment.overwrite({ ...data, ...req.body });
    payment.save();

    res.status(500).json({
      msg: "Payment updated!",
      data: {
        payment,
      },
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = app;
