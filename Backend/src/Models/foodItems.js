const mongoose = require("mongoose")


const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodPartner: {
        // because we want that whos partner is added the food
        type:mongoose.Schema.Types.ObjectId,  
        ref: "foodpartners"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.model("foodItems",foodSchema)

module.exports = foodModel;