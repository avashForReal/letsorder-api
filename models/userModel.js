const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: 8
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "employee", "admin"],
    },
    accessToken: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);