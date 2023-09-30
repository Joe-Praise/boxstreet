const mongoose = require("mongoose")

const ManagementSchema = new mongoose.Schema({
    branch_id: {
        type: String,
        required:true
    },
    cinema_id: {
        type: String,
        required:true
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
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },

    created_at: {
        type: Date,
        default: Date.now
    }

});
const Management = mongoose.model("managements", ManagementSchema);
module.exports = Management
