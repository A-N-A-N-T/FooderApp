const foodModel = require("../Models/foodItems");
const likeModel = require("../Models/likeModel");
const SaveModel = require("../Models/Save_Model");
const { uploadFile } = require("../services/imageStorage")
const { v4: uuid } = require("uuid")

const createFood = async (req, res) => {
    try {
        const { name , description } = req.body;
        // console.log(req.body);
        // console.log(req.file);

        // Upload the file -- basically to upload the file in the cloud storage.  
        const fileUploadResult = await uploadFile(req.file.buffer, uuid());
        // console.log("fileUpload", fileUploadResult);
        const saveFoodToDb = await foodModel.create({
            name: name,
            description: description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })
        // Send a single, final response to the client
        res.status(201).json({
            message: "food item created successfully!",
            food: saveFoodToDb
        })

    } catch (error) {
        console.error("Error creating food item:", error);
        // It's good practice to send an error response if something goes wrong
        res.status(500).send("Error creating food item.");
    }
};

const getFoodItem = async (req,res) => {
    const allFoodItems = await foodModel.find({});
    if(allFoodItems.length > 0){
        return res.status(201).json({message: "You have list of food items",allFoodItems})
    }else{
        return res.json({message:"You dont have food items yet!"})
    }
}

const likedFood = async (req,res) =>{
    const { foodId } = req.body;  // here we get that food id on which current user clicked for like.
    const user = req.User;   // at the time of user verfication in middleware we put the user in the req object only if the token is valid.
    const isAlreadyLiked = await likeModel.findOne({   
        user: user._id,
        food: foodId
    })
    if(isAlreadyLiked){  // if we get any value in this that mean current user already liked it!
        await likeModel.deleteOne({   // so we delete it!
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{   // we just minus the count of like
            $inc: {likeCount: -1}
        })
        return res.status(200).json({
          message: "Food is Unliked now!"
        })
    }
    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
         $inc: {likeCount: 1}
    })
    return res.json({
        message: "Food Liked Successfully!",
        like
    })


}

const saveFood = async (req,res) => {
    const { foodId } = req.body;
    const user = req.User;
    const isAlreadySaved = await SaveModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadySaved){
        await SaveModel.deleteOne({
            user: user._id,
            food: foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc: {savesCount: -1}
        })
        
        return res.status(200).json({
          message: "Food is Unsaved now!"
        })
    }
    const saved = await SaveModel.create({
        user: user._id,
        food: foodId
    }) 
    await foodModel.findByIdAndUpdate(foodId,{
            $inc: {savesCount: 1}
    })
 
    return res.json({
        message: "Food saved Successfully!",
        saved
    })   
}

const getSavedFood = async (req,res) => {
    const allSavedVideos = await SaveModel.find({user:req.User}).populate("food")
    if(allSavedVideos.length > 0){
        return res.json({
            message: "You get all saved videos",
            allSavedVideos
        })
    }
    return res.json({
        message: "You do not have saved videos!"
    })
}



module.exports = { createFood ,getSavedFood,saveFood, getFoodItem , likedFood }
