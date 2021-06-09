const express = require("express")
const router = express.Router()

//fs import
// const checkAuth = require("../middlewares/checkAuth");
// const checkAdmin = require("../middlewares/checkAdmin");
// const checkEmployee = require("../middlewares/checkEmployee");
// const checkCustomer = require("../middlewares/checkCustomer");

//menu controller
const menuController = require("../controllers/menuController")

//todo: protect routes with proper access

// /api/menu/
//add new menu
router.route('/')
    .get(menuController.getMenu) //get all menu
    .post(menuController.addMenu) //post new menu

// /api/menu/:menuId
router.route('/:menuId')
    .get(menuController.getIndividualMenu) //get individual menu category
    .delete(menuController.deleteIndividualMenu) //delete individual menu category

//api/menu/:menuId/items
router.route('/:menuId/item')
    .get(menuController.getAllMenuItem) //get all menu item from the menu item array
    .post(menuController.addIndividualMenuItem) //post new menu item to the category

//api/menu/:menuId/item/:itemId
router.route('/:menuId/item/:itemId')
    .get(menuController.getIndividualMenuItem)
    .delete(menuController.deleteIndividualMenuItem)

module.exports = router