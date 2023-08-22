const managerRoute = (req, rest, next) => {
    if (req.user.role === "employee" || req.user.role === "admin" || req.user.role === "manager") {
        next()
    } else {
        rest.status(401).json({ error: "You are not authorized to access This Page" })
    }
}



module.exports = managerRoute