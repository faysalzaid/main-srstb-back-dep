const express = require('express')
const verifyJWT = require('../middlewares/verifyJwt')
const route = express.Router()
const { User, validate } = require('../models/usersModel')
const bcrypt = require('bcrypt')
const joi = require('joi')


registerSchema = joi.object({
    name: joi.string().min(5).max(15).required(),
    email: joi.string().email().required(),
    password: joi.string().max(15).min(8).required()
})



route.post('/', async(req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body, { abortEarly: false })
        if (error) return res.send({ error: error.details[0].message })
        const { name, email, password } = req.body
        bcrypt.hash(password, 10, async(err, hash) => {
            if (err) return res.json({ error: 'Error has occured please re-enter data' })
            if (!name || !email || !password) return res.send({ error: 'Data is needed' })
            const fusername = await User.findOne({ where: { name: name } })
            if (fusername) return res.send({ error: 'User with this name is already exists, please try another one ' })
            const femail = await User.findOne({ where: { email: email } })
            if (femail) return res.send({ error: 'User with this email already exists' })
            const userSaved = await User.create({ name: name, email: email, password: hash })
            res.status(200).json(userSaved)
        })


    } catch (e) {
        res.send({ error: e.message })
    }
})






module.exports = route