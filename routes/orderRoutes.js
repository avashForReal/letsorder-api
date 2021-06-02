const express = require("express")
const router = express.Router()

//fs import
// const authController = require("../controllers/authController");

router.route('/')
    .post((req, res) => {
        res.send('only access to employee and admin')
    })



module.exports = router