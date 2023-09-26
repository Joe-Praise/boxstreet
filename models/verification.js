const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
      code: {
        type: String,
        required: true
      },
      is_active: {
        type: Boolean
      },
      cinema_id: {
        type: String,
        required: true,
        ref: "cinemas"
      }
},{timestamps:true});
const Verification = mongoose.model("verifications", VerificationSchema);
module.exports = Verification;