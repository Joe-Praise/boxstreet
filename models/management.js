const mongoose = require("mongoose")

const ManagementSchema = new mongoose.Schema({
    branch_id: {
        type: String,
    },
    fullname: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ["COUNTER", "THEATER_ADMIN", "WEBSITE_ADMIN"],
        uppercase:true
    },
    password: {
        type: String
    },

    created_at: {
        type: Date,
        default: Date.now
    }

});
const Management = mongoose.model("managements", ManagementSchema);
module.exports = Management
