const mongoose = require("mongoose");

//fs imports
//import menu model
const Menu = require("../models/menuModel");
//import validator module
const { validateMenu, validateMenuItems } = require("../utils/validator");

/* MENU SCHEMA
{
	"menuCategory" :	"Coffee",
	"menuItems":	[{
						"itemName": "Coffee Latte",
						"itemDescription": "coffee with the best flavour of latte",
						"itemPrice"	: 100
					},
					{
						"itemName": "Coffee Mocha",
						"itemDescription": "coffee with the best flavour of Mocha",
						"itemPrice"	: 120
					}]
    }    
*/

//add new menu category
//POST /api/menu/
const addMenu = async(req, res, next) => {
    try {
        //validate data from request body
        const { error } = validateMenu(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        //destructure the data
        const { menuCategory, menuItems } = req.body;

        //check if the menu category already exists
        const menu = await Menu.findOne({ menuCategory: req.body.menuCategory });
        if (menu) {
            return res
                .status(400)
                .send({ error: "Error! Menu category already exists" });
        }

        //define new document
        const newMenu = new Menu({
            menuCategory,
            menuItems,
        });

        //save the data
        await newMenu.save();

        //send created respose
        res.status(201).send({
            data: newMenu,
            message: "New menu category successfully created",
        });
    } catch (err) {
        console.log(err);
        next();
        // res.status(400).json({ error: "Something went wrong" });
    }
};

//get all menu categories
//GET /api/menu/
const getMenu = async(req, res) => {
    try {
        //get all menus
        const menu = await Menu.find({});
        res.status(200).send(menu);
    } catch (err) {
        // console.log(err)
        res.status(500).send({ error: "Something went wrong" });
    }
};

// get individual menu category
// menuId -> must be a valid mongoose object id
// GET /api/menu/:menuId
const getIndividualMenu = async(req, res) => {
    try {
        const menuId = req.params.menuId;
        if (mongoose.isValidObjectId(menuId)) {
            const individualMenu = await Menu.findById(menuId);
            res.status(200).send(individualMenu);
        } else {
            res.status(404).send({ error: "Menu not found!" });
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
};

//delete menu category
//DELETE /api/menu/:menuId
const deleteIndividualMenu = async(req, res) => {
    try {
        const menuId = req.params.menuId;
        // proceed only if object id is valid
        if (mongoose.isValidObjectId(menuId)) {
            const deletedMenu = await Menu.findByIdAndDelete(menuId);
            if (deletedMenu) {
                res.status(200).send({ deletedMenu });
            } else {
                res.status(404).send({ error: "Menu not found!" });
            }
        } else {
            res.status(404).send({ error: "Menu not found!" });
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
};

//add menu item
//POST /api/menu/:menuId/item
/* Menu item schema
            {
						"itemName": "Coffee Capuccino",
						"itemDescription": "coffee with the best flavour of Capuccino",
						"itemPrice"	: 100
			}  
*/
const addIndividualMenuItem = async(req, res) => {
    try {
        //validate the data from request body
        const { error } = validateMenuItems(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        //get the params
        const menuId = req.params.menuId;

        // check if the menuId is valid
        if (mongoose.isValidObjectId(menuId)) {
            // check if the menu with requested id exists
            const individualMenu = await Menu.findById(menuId);
            if (individualMenu) {
                // destructure the data
                const { itemName, itemDescription, itemPrice } = req.body;
                const itemToInsert = { itemName, itemDescription, itemPrice };
                // individualMenu.menuItems.push(itemToInsert);
                // await individualMenu.save();

                //update(push new item) to the menu
                const updatedMenu = await Menu.findByIdAndUpdate(
                    menuId, { $push: { menuItems: itemToInsert } }, { new: true }
                );
                res.status(201).send({
                    updatedMenu,
                    message: "New item successfully added !",
                });
            } else {
                res.status(404).send({ error: "Menu to update is not found!" });
            }
        } else {
            res.status(404).send({ error: "Menu not found!" });
        }

        // console.log(itemName, itemDescription, itemPrice, menuId);
    } catch (err) {
        // console.log(err)
        res.status(400).send({ error: err });
    }
};


//get menu item by id
//GET /api/menu/:menuId/item/:itemId
const getIndividualMenuItem = (req, res) => {
    try {

    } catch (err) {
        res.status(400).send({ error: err })
    }
}

//delete menu item
//DELETE /api/menu/:menuId/item/:itemId

module.exports = {
    addMenu,
    getMenu,
    getIndividualMenu,
    deleteIndividualMenu,
    addIndividualMenuItem,
};