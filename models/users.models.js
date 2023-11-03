const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
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
    hashedPassword: {
         type: String,
         required: true,
         trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    designation: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 2,
        required: true
    }
});

module.exports = mongoose.model('Users', usersSchema);