const express = require('express')

const route = express.Router()
const { User, validate } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middlewares/verifyJwt')





const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.name, email: user.email, role: user.role, image: user.image, refreshToken: user.refreshToken }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.name, email: user.email, role: user.role, image: user.image }, process.env.REFRESH_TOKEN_SECRET);
};




route.post('/', async(req, res) => {
    const { email, password } = req.body
    try {
        const error = validate(req.body)
        if (error) return res.send(error.details[0].message)
        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.send({ error: 'Invalid email' });
        const isValidUser = await bcrypt.compare(req.body.password, user.password)
        if (!isValidUser) return res.send({ error: 'password invalid' });
        const refreshToken = generateRefreshToken(user)
        user.refreshToken = refreshToken
        await user.save()
        const accessToken = generateAccessToken(user)

        res.status(202).cookie('accessToken', accessToken, {
            sameSite: "None",
            secure:true,
            path: "/",
            expiresIn: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.setHeader('Authorization', `Bearer ${accessToken}`).json({ token: accessToken, id: user.id, name: user.name, email: user.email, role: user.role, image: user.image, refreshToken: refreshToken });
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





route.post('/refreshToken', async(req, res) => {
    // will take the refresh token from user 
    try {
        const id = req.body.id
        const fUser = await User.findOne({ where: { id: id } })
            // console.log(":::::::::::::::::UserONe", fUser, "::::::::::::::")
        if (!fUser) return res.send('Not Authorized Please Login')
        jwt.verify(fUser.refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, DECODED) => {
            if (err) return res.send({ error: "Invalid Token" })
                // console.log('This is teh found user', fUser);
            const newAccessToken = generateAccessToken(fUser)
            return res.status(202).cookie('accessToken', newAccessToken, {
                sameSite: "None",
                secure:true,
                path: "/",
                expiresIn: 24 * 60 * 60 * 1000,
                httpOnly: true,
            }).send({ token: newAccessToken, id: fUser.id, name: fUser.name, email: fUser.email, role: fUser.role, image: fUser.image, refreshToken: fUser.refreshToken })
        })
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }




})



route.post('/logout', async(req, res) => {
    try {
        const data = req.body
        const fUser = await User.findOne({ where: { id: data.id } })
        fUser.refreshToken = null
        await fUser.save()
        res.status(202).clearCookie('accessToken').send("Successfully Logged Out")
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})


route.get('/auth', verifyJWT, (req, res) => {
    res.json(req.user)
})


module.exports = route
