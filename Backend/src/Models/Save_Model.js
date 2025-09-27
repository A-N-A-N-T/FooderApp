const mongoose = require("mongoose")


const SaveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodItems',
        required: true
    }

},{
    timestamps: true
})

const SaveModel = mongoose.model("Saves",SaveSchema)

module.exports = SaveModel