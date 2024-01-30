const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Item = mongoose.model("item", UserSchema);
module.exports = Item;