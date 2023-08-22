const managerRoute = (req, rest, next) => {
    if (req.user.role === "client" || req.user.role === "admin" || req.user.role === "manager") {
        next()
    } else {
        rest.status(401).json({ error: "You are not authorized to access this page" })
    }
}



module.exports = managerRoute