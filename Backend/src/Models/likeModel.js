const mongoose = require("mongoose")


const likeSchema = mongoose.Schema({
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

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel;