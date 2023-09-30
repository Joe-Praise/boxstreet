const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    branch_id: {
        type: String,
        required: true,
        ref: "branches"
      },
      event_name: {
        type: String,
        required: true,
      },
      is_paid_event: {
        type: Boolean,
        default: true,
      },
      event_date: {
        type: Date,
        default: Date.now 
      },
      event_description: {
        type: String,
      },
      is_deleted: {
        type: Boolean,
        default:false
      },
},  { timestamps: true });
const Event = mongoose.model("events", EventSchema);
module.exports = Event;