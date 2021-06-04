const express = require("express")
const router = express.Router()

//fs import
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const checkEmployee = require("../middlewares/checkEmployee");
const checkCustomer = require("../middlewares/checkCustomer");

//menu controller
const menuController = require("../controllers/menuController")

//routes with admin access
//add new menu
router.route('/')
    .get(menuController.getMenu)
    .post(menuController.addMenu)



module.exports = router