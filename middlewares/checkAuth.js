const jwt = require("jsonwebtoken")


//validate token which ensures user login
const checkAuth = async(req, res, next) => {
    //get token
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided!" });
    }
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        // console.log(req.user)
        next()
    } catch (err) {
        res.status(400).json({ error: "Something went wrong" });
    }
};

module.exports = checkAuth;