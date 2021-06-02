const express = require("express")
const router = express.Router()

//fs import
const userController = require("../controllers/userController")

router.route('/signup')
    .post(userController.signup)

router.route('/login')
    .post(userController.login)

module.exports = router