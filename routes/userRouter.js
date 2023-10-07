const express = require('express')
const verifyJWT = require('../middlewares/verifyJwt')
const route = express.Router()
const { User, validate } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const { Router } = require('express')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
const adminRoute = require('../middlewares/adminMiddleware')
const managerRoute = require('../middlewares/managerMiddleware')
const Project = require('../models/projectModel')
const bidModel = require('../models/bidModel');
const SlipPaper = require('../models/slipModel')
require("dotenv").config()



route.get('/', verifyJWT, async(req, res) => {
    // console.log('CURRENT USER :', req.user);
    try {
        const users = await User.findAll({
            include: [Project],
          
        })
        res.json(users)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) return res.status(404).send({ error: "User not found" })
        res.json(user)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/name/:name', verifyJWT, managerRoute, async(req, res) => {
    const name = req.params.name
    try {
        const user = await User.findOne({ where: { name } })
        if (!user) return res.send({ error: "User not found" })
        res.json(user)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) return res.send({ error: "User not found" })
        user.destroy()
        res.json("successfully deleted")

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJWT, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const suser = await User.findOne({ where: { id } }) //suser->for searched user
        if (!suser) return res.send({ error: 'User Not found' })
        if (req.files) {
            const profileImage = req.files.image
            const toBeSavedImage = `${crypto.randomBytes(5).toString('hex')}${profileImage.name}`
            profileImage.mv(`./public/profiles/${toBeSavedImage}`)
            const imageUrl = `${process.env.PROFILE_URL}/${toBeSavedImage}`
            if (data.password) {
                bcrypt.hash(data.password, 10, async(err, hash) => {
                    if (err) return res.send({ error: "An error has occured , please try again!" })
                    suser.name = data.name
                    suser.email = data.email
                    suser.role = data.role
                    suser.image = imageUrl
                    suser.password = hash
                    await suser.save()
                    return res.json(suser)

                })
            } else {
                suser.name = data.name
                suser.email = data.email
                suser.role = data.role
                suser.image = imageUrl
                await suser.save()
                return res.json(suser)
            }
        } else {
            if (data.password) {
                bcrypt.hash(data.password, 10, async(err, hash) => {
                    if (err) return res.send({ error: "An error has occured , please try again!" })
                    suser.name = data.name
                    suser.email = data.email
                    suser.role = data.role
                    suser.password = hash
                    await suser.save()
                    return res.json(suser)

                })
            } else {
                suser.name = data.name
                suser.email = data.email
                suser.role = data.role
                await suser.save()
                return res.json(suser)
            }
        }

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/', verifyJWT, async(req, res) => {
    try {
        const error = validate(req.body)
        console.log('This is from console', error);
        if (error) return res.send({ error: error.details[0].message })
            // console.log(req.body);
        const { name, email, password, role, image } = req.body

        bcrypt.hash(password, 10, async(err, hash) => {
            if (err) return res.json({ error: 'Error has occured please re-enter data' })
            if (!name || !email || !password) return res.send({ error: 'Data is needed' })
            const fusername = await User.findOne({ where: { name: name } })
            if (fusername) return res.send({ error: 'User with this name is already exists ' })
            const fuser = await User.findOne({ where: { email: email } })
            if (fuser) return res.send({ error: 'User with this email already exists' })

            if (req.files) {
                const profileImage = req.files.image
                const toBeSavedImage = `${crypto.randomBytes(5).toString('hex')}${profileImage.name}`
                profileImage.mv(`./public/profiles/${toBeSavedImage}`)
                const imageUrl = `${process.env.PROFILE_URL}/${toBeSavedImage}`
                const userSaved = await User.create({ name: name, email: email, password: hash, role: role, image: imageUrl })
                return res.status(200).json(userSaved)
            }
            const userSaved = await User.create({ name: name, email: email, password: hash, role: role })
            res.status(200).json(userSaved)
        })
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/try/forgotpassword', async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({ where: { email } })
    console.log('reached the user', user);
    if (!user) return res.json({ error: "User with Your email is not registered" })
    const token = Jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })
    const url = `${process.env.MAIN_URL}/reset-password/${user.id}/${token}`
    const msg = {
        from: "CelluTech Support Team <support.cellutech.net>",
        to: user.email,
        subject: "Password Reset",
        text: `Hey There ${user.name}, Here is your password reset link ${url}`
    }
    let mailTransport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const sent = await mailTransport.sendMail(msg, (err, info) => {
        console.log('sent mail', info.messageId);
    })
    res.send('Successfull')

})

route.get('/resetpassword/:id/:token', async(req, res) => {
    const { id, token } = req.params
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) return res.json({ error: "User doesnt exist,please create new account" })
        const tokenCheck = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!tokenCheck) return res.json({ error: "Your token is not valid, try again" })
        res.json(user)
    } catch (error) {
        res.json({ error: "The token is not valid,try again" })
    }

})

route.post('/resetpassword/:id/:token', async(req, res) => {
    const { id, token } = req.params
    try {
        const user = await User.findOne({ where: { id } })
        if (!user) return res.json({ error: "User doesnt exist,please create new account" })
        const tokenCheck = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!tokenCheck) return res.json({ error: "Your token is not valid, try again" })

        const { password, confirmPassword } = req.body
        if (!password && !confirmPassword) return res.json({ error: "Please provide Fields" })
        if (password !== confirmPassword) return res.json({ error: "Two passwords must match" })
        const hashedPassword = bcrypt.hash(password, 10, (async(err, result) => {
            if (!err) {
                user.password = result
                await user.save()
                return res.send("success")
            } else {
                return res.json({ error: "Some Error Ocurred Try Again" })
            }
        }))
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




route.get('/list', async(req, res) => {

})


module.exports = route