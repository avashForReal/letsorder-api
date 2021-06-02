module.exports = (req, res, next) => {
    if (req.user.userRole !== "employee") {
        return res.status(403).json({ error: 'Access denied. Not enough rights!' })
    } else {
        next()
    }
}