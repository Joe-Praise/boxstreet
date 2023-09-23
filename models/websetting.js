const mongoose = require("mongoose");

const WebsettingSchema = new mongoose.Schema({
      website_name: {
        type: String,
        required: true,
      },
      website_logo: {
        type: String,
        required: true,
      },
});
const Websetting = mongoose.model("websettings", WebsettingSchema);
module.exports = Websetting;