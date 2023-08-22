const express = require('express')
const verifyJwt = require('../middlewares/verifyJwt')
const contractModel = require('../models/contractModel')
const paymentModeModel = require('../models/paymentModeModel')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const pmode = await paymentModeModel.findAll()
        res.status(200).json(pmode)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pmode = await paymentModeModel.findOne({ where: { id } })
        if (!pmode) return res.status(404).json({ error: "payment mode not Found" })
        res.status(200).json(pmode)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const checkMode = await paymentModeModel.findOne({ where: { mode: data.mode } })
        if (checkMode) return res.json({ error: "This Mode has already been registered" })
        const pmode = await paymentModeModel.create(data)
        res.status(200).json(pmode)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})



route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pmode = await paymentModeModel.findOne({ where: { id } })
        if (!pmode) return res.status(404).json({ error: "payment mode not Found" })
        pmode.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route