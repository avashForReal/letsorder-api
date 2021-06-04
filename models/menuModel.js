const mongoose = require("mongoose");

//for individual item in a category - ex: coffee - milk,black etc.
const menuItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        default: "",
    },
    itemPrice: {
        type: Number,
        required: true,
    },
});

const menuCategorySchema = new mongoose.Schema({
    menuCategory: {
        type: String,
        required: true,
    },
    menuItems: [menuItemSchema],
}, { timestamps: true });

module.exports = mongoose.model("menuCategory", menuCategorySchema);