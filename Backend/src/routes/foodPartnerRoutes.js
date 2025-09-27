const express = require("express");
const { getVdosOfFoodPartner } = require("../Controllers/foodPartnerController");
const {  authUserMiddleware } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/:id",authUserMiddleware,getVdosOfFoodPartner)





module.exports = router

