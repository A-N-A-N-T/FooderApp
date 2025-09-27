const express = require("express")
const { registerController, loginController, logoutController, foodPartnerRegisterController, foodPartnerLoginController, foodPartnerLogout } = require("../Controllers/authController")

const route = express.Router()


route.post("/user/register",registerController)
route.post("/user/login",loginController)
route.get("/user/logout",logoutController)


route.post("/foodPartner/register",foodPartnerRegisterController)
route.post("/foodPartner/login",foodPartnerLoginController)
route.get("/foodPartner/logout",foodPartnerLogout)


module.exports = route