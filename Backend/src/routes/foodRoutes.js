const express = require("express");
const { authFoodPartnerMiddleware, authUserMiddleware } = require("../Middlewares/authMiddleware");
const { createFood, getFoodItem, likedFood, saveFood, getSavedFood } = require("../Controllers/foodController");
const router = express.Router()
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
})

// here we use the middleware because only foodpartner can add or we can say create a food here..
router.post("/uploadFood",authFoodPartnerMiddleware,upload.single("mama"),createFood) 


router.get("/",authUserMiddleware,getFoodItem)

router.post("/like",authUserMiddleware,likedFood)

router.post("/save",authUserMiddleware,saveFood)

router.get("/allSavedFood",authUserMiddleware,getSavedFood)
module.exports = router;