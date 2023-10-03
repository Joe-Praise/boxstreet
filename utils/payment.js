const axios = require("axios");
const Transaction = require("../models/transaction");
const codeGenerator = require("./codeGenerator");

const initiatePaymentService = async (req, res) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      },
    };

    const body = {
      amount: Number(req.body.amount) * 100,
      email: req.user.email,
      reference: "BS-TF" + codeGenerator(10),
    };

    const response = await axios.post(process.env.PAYSTACK_URL, body, options);
    const paymentLink = response.data;

    const transaction = new Transaction({ ...body, amount: body.amount / 100 });
    await transaction.save();

    res.status(200).json({
      status: "Transaction initalized",
      data: {
        paymentLink,
      },
    });
  } catch (err) {
    return res.status(402).json({
      err: err.message,
    });
  }
};

const paystackWebhookService = async (payload) => {
  try {
    const user = await Transaction.findOne({
      reference: payload.data.reference,
    });

    console.log(payload);
    console.log(user);
  } catch (err) {
    return res.status(402).json({
      err: "unable to get payment information",
    });
  }
};

module.exports = {
  initiatePaymentService,
  paystackWebhookService,
};
