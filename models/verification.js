const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
    date_created: {
        type: String,
        default: Date.now 
      },
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
});
const Verification = mongoose.model("verifications", VerificationSchema);
module.exports = Verification;