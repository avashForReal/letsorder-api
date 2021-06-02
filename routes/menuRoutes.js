const express = require("express")
const router = express.Router()

//fs import
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const checkEmployee = require("../middlewares/checkEmployee");


router.route('/')
    .post([checkAuth, checkAdmin], (req, res) => {
        res.send('looks like you are an admin');
    })

module.exports = router