const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../Models/foodPartner");
const userModel = require("../Models/userModel");



async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;
    if (!token) {
       // that means there is no token in the cookies of browser
       return res.status(401).json({
        message: "Please login first!"
       })        
    }    
    try {
        const decodedValueFromToken = jwt.verify(token,`${process.env.secret}`)
        const foodPartner = await foodPartnerModel.findById(decodedValueFromToken.id)
        req.foodPartner = foodPartner
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }

}

const authUserMiddleware = async (req,res,next) => {
    const token = req.cookies.token  // here we check token present or not.
    if(!token){  // if token is not present here that means there is no logged in user is present.
        return res.json({message: "Please login first!"})
    } 
    
    try {
        const isValidUser = jwt.verify(token,`${process.env.secret}`)   // here we verify the token.
        // isValidUser contain a id in it.
        const findSameUserInDb = await userModel.findById({_id:isValidUser.id}) // if we find any user with the same id... that means user is valid 
        req.User = findSameUserInDb;
        next()
    } catch (error) {
        return res.json({message:"Invalid Token!"})
    }
}

module.exports = { 
    authFoodPartnerMiddleware,
    authUserMiddleware
}