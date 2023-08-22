require('dotenv').config()
const jwt = require('jsonwebtoken')


const verifyJwt = (req, res, next) => {
    try {
        const authHeader = req.headers
        const token = req.cookies.accessToken
            // console.log('Access is :::::::', token);
        if (!token) return res.status(401).send({ error: 'UnAuthorized' })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, DECODED) => {
            if (err) return res.status(403).send({ error: 'Forbidden' })
            req.user = { id: DECODED.id, username: DECODED.username, email: DECODED.email, role: DECODED.role, image: DECODED.image, refreshToken: DECODED.refreshToken }
            next()
        })

    } catch (error) {

    }
}


module.exports = verifyJwt