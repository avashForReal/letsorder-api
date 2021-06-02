const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//fs imports
const User = require("../models/userModel");

const hashPassword = async(password) => await bcrypt.hash(password, 10);

const validatePassword = async(plainPw, hashedPw) => {
    return await bcrypt.compare(plainPw, hashedPw);
};

//signup user
exports.signup = async(req, res, next) => {
    try {
        // get data from request body
        const { email, password, role } = req.body;

        //validate the data
        //to be done

        //hash the password
        const hashedPassword = await hashPassword(password);
        //define new user from using user model
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || "customer",
        });

        //define jwt payload
        const payload = {
            userId: newUser._id,
            userRole: newUser.role,
        };

        //get access token
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //assign the access token to the user
        newUser.accessToken = accessToken;

        //save the user
        await newUser.save();

        res.status(201).json({
            data: newUser,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};


//login user
exports.login = async(req, res, next) => {
    try {
        //get data from request body
        const { email, password } = req.body;

        //validate the data
        //to be done


        //search for requested user to be logged in
        const user = await User.findOne({ email });
        if (!user) return next(new Error(`user does not exist`));

        //if user found then validate the password
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error(`password is incorrect`));

        //define jwt payload
        const payload = {
            userId: user._id,
            userRole: user.role,
        };

        //get new access token
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //update values and login user
        await User.findByIdAndUpdate(user._id, { accessToken })

        //return status codes and data
        res.status(200).json({
            data: {
                email: user.email,
                role: user.role
            },
            accessToken
        })

    } catch (err) {
        next(err)
    }
}