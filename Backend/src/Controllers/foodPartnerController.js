const foodModel = require("../Models/foodItems");
const foodPartnerModel = require("../Models/foodPartner");


const getVdosOfFoodPartner = async (req,res) =>  {
    const particularFoodPartnerId = req.params.id;
    // console.log(particularFoodPartnerId)
    const foodPartner = await foodPartnerModel.findById(particularFoodPartnerId)
    // console.log(foodPartner)
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: particularFoodPartnerId})
    if(!foodPartner){
        return res.status(404).json({
            message: "Food partner not found!"
        })
    }
    res.status(200).json({
        message: "Food Partner retrieved Successfully!",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })
}

module.exports = { getVdosOfFoodPartner } 