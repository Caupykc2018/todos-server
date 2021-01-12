const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model("User", userSchema);