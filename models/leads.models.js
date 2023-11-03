const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    leadSource: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },

});

module.exports = mongoose.model('Leads', leadsSchema);