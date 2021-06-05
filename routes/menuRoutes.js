const express = require("express")
const router = express.Router()

//fs import
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const checkEmployee = require("../middlewares/checkEmployee");
const checkCustomer = require("../middlewares/checkCustomer");

//menu controller
const menuController = require("../controllers/menuController")

//todo: protect routes with proper access

// /api/menu/
//add new menu
router.route('/')
    .get(menuController.getMenu)
    .post(menuController.addMenu)

// /api/menu/:menuId
router.route('/:menuId')
    .get(menuController.getIndividualMenu)
    .delete(menuController.deleteIndividualMenu)

//api/menu/:menuId/items
router.route('/:menuId/item')
    .post(menuController.addIndividualMenuItem)


module.exports = router