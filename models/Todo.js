const { strict } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model("Todo", todoSchema);