const { response } = require('express')
const express = require('express')
const letterRequestModel = require('../models/letterRequestModel')
const route = express.Router()
const { User } = require('../models/usersModel')
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()


route.get('/', verifyJwt, async(req, res) => {
    try {
        const letter = await letterRequestModel.findAll({ include: { model: User } })
        res.status(200).json(letter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const letter = await letterRequestModel.findOne({
            where: { id },
            include: { model: User }
        })
        if (!letter) return res.status(404).json({ error: "letter Not Found" })
        res.status(200).json(letter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {

        const data = req.body
        const letter = await letterRequestModel.create({ UserId: data.UserId, letter: data.letter })
        res.status(200).json(letter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const letter = await letterRequestModel.findOne({ where: { id } })
        if (!letter) return res.status(404).json({ error: "letter Not Found" })
        await letter.update({ UserId: data.UserId, letter: data.letter })
        res.status(200).json(letter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const letter = await letterRequestModel.findOne({ where: { id } })
        if (!letter) return res.status(404).json({ error: "letter Not Found" })
        await letter.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route