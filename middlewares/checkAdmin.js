//401 unauthorized
//403 forbidden
//400 something went wrong
module.exports = (req, res, next) => {
    if (req.user.userRole !== "admin") {
        return res.status(403).json({ error: 'Access denied. Not enough rights!' })
    } else {
        next()
    }
}