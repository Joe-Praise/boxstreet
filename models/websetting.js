const mongoose = require("mongoose");

const WebsettingSchema = new mongoose.Schema({
      website_name: {
        type: String,
        required: true,
      },
      website_logo: {
        type: String,
      
      },
      is_deleted: {
        type: Boolean,
        default:false
      },
},
{ timestamps: true });
const Websetting = mongoose.model("websettings", WebsettingSchema);
module.exports = Websetting;