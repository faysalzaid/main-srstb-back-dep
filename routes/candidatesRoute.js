const express = require('express')
const candidatesModel = require('../models/candidatesModel')
const leaveModel = require('../models/leaveModel')
const verifyJwt = require('../middlewares/verifyJwt')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const candidate = await candidatesModel.findAll()
        res.status(200).json(candidate)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const candidate = await candidatesModel.findOne({ where: { id } })
        if (!candidate) return res.status(404).json({ error: "candidate Not Found" })
        res.status(200).json(candidate)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const candidate = await candidatesModel.create(data)
        res.status(200).json(candidate)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const candidate = await candidatesModel.findOne({ where: { id } })
        if (!candidate) return res.status(404).json({ error: "candidate Type Not Found" })
        await candidate.update(data)
        res.status(200).json(candidate)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const candidate = await candidatesModel.findOne({ where: { id } })
        if (!candidate) return res.status(404).json({ error: "candidate Type Not Found" })
        candidate.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route