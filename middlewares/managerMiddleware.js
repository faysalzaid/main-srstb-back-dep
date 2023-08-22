const managerRoute = (req, rest, next) => {
    if (req.user.role === "manager" || req.user.role === "admin") {
        next()
    } else {
        rest.status(401).json({ error: "You are not authorized to access this page" })
    }
}



module.exports = managerRoute