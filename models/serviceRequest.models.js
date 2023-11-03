const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
    caseNumber: {
        type: Number,
        required: true,
        trim: true
    },
    clientName: {
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
    caseReason: {
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

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);