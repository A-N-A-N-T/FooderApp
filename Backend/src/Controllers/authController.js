const userModel = require("../Models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../Models/foodPartner");


// user register controller
const registerController = async (req,res) => {
    const {fullName , email , password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email:email
    })
    if(isUserAlreadyExist){
        // means user already exists
        return res.status(400).json({
            message: "User Already Exists!"
        })
    }  
    const hashedPass = await bcrypt.hash(password,10)  // we hashed the password..
    const createdUser = await userModel.create({
        fullName: fullName,
        email: email,
        password: hashedPass
    })
    

    // here we create token just after register for cookies
    const token = jwt.sign({id:createdUser._id},`${process.env.secret}`)
    res.cookie("token",token)
    res.status(201).json({
        message: "User created Successfully",
        user: {
            _id:createdUser._id,
            name: createdUser.fullName,
            email: createdUser.email
        }
    })
}   


const loginController = async (req,res) => {
    const { email,password } = req.body;
    
    // finding isUserWithTheSameEmail

    const isUserWithTheSameEmail = await userModel.findOne({
        email: email
    })
    if(!isUserWithTheSameEmail){
        return res.status(404).json({
            message: "Invalid email or password!"
        })
    }


    // now check isPassValidOrNot
    const isPassValidOrNot = await bcrypt.compare(password,isUserWithTheSameEmail.password)
    if(!isPassValidOrNot){
        return res.status(404).json({
            message: "Invalid email or password!"
        })
    }

    // if we successfully come to this line.. -- that means we can create a token

    const token = jwt.sign({id:isUserWithTheSameEmail._id},`${process.env.secret}`)
    res.cookie("token",token)
    return res.status(201).json({
        message: "Login Successfully!",
        user: {
            FullName: isUserWithTheSameEmail.fullName,
            email : isUserWithTheSameEmail.email
        }
    })
}


const logoutController = async (req,res) => {
   res.clearCookie("token") 
   res.status(200).json({
    message: "User logged out successfully"
   })
    
}


// register controller for the food partner 
const foodPartnerRegisterController = async (req,res) => {
    const {name , email ,contactName,phone,address, password } = req.body;

    const isFoodPartnerAlreadyExist = await foodPartnerModel.findOne({
        email:email
    })
    if(isFoodPartnerAlreadyExist){
        // means foodpartner already exists
        return res.status(400).json({
            message: "Food Partner Already Exists!"
        })
    }  
    const hashedPass = await bcrypt.hash(password,10)  // we hashed the password..
    const createdFoodPartner = await foodPartnerModel.create({
        name: name,
        contactName: contactName,
        phone: phone,
        address: address,
        email: email,
        password: hashedPass
    })

        // here we create token just after register for cookies
    const token = jwt.sign({id:createdFoodPartner._id},`${process.env.secret}`)
    res.cookie("token",token)
    res.status(201).json({
        message: "FoodPartner created Successfully",
        foodPartner: {
            _id:createdFoodPartner._id,
            contactName: createdFoodPartner.contactName,
            phone: createdFoodPartner.phone,
            name: createdFoodPartner.name,
            email: createdFoodPartner.email
        }
    })
}

// login controller for the food partner

const foodPartnerLoginController = async (req,res) => {

    const { email,password } = req.body;
    
    // finding isFoodPartnerWithTheSameEmail

    const isFoodPartnerWithTheSameEmail = await foodPartnerModel.findOne({
        email: email
    })
    if(!isFoodPartnerWithTheSameEmail){
        // that means foodpartner never registered yet!
        return res.status(404).json({
            message: "Invalid email or password!"
        })
    }


    // now check isPassValidOrNot
    const isPassValidOrNot = await bcrypt.compare(password,isFoodPartnerWithTheSameEmail.password)
    if(!isPassValidOrNot){
        return res.status(404).json({
            message: "Invalid email or password!"
        })
    }

    // if we successfully come to this line.. -- that means we can create a token

    const token = jwt.sign({id:isFoodPartnerWithTheSameEmail._id},`${process.env.secret}`)
    res.cookie("token",token)
    return res.status(201).json({
        message: "Login Successfully!",
        FoodPartner: {
            name: isFoodPartnerWithTheSameEmail.name,
            email : isFoodPartnerWithTheSameEmail.email
        }
    })
    
}

// logout controller for the food partner

const foodPartnerLogout = async (req,res) => {
    res.clearCookie("token") 
   res.status(200).json({
    message: "FoodPartner logged out successfully!"
   })
}

module.exports = { registerController 
    , logoutController , loginController , foodPartnerLoginController , 
    foodPartnerLogout, foodPartnerRegisterController
}
 