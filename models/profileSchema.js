const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
{
    username: { 
        type: String,
        required: true,
        unique: false
    },
    dob: { 
        type: Number,
        required: false,
        unique: false
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);
