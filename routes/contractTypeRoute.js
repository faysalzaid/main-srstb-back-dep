const express = require('express')
const contractType = require('../models/contractTypeModel')
const verifyJwt = require('../middlewares/verifyJwt')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const contract = await contractType.findAll()
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const contract = await contractType.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Type Not Found" })
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const contract = await contractType.create(data)
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const contract = await contractType.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Type Not Found" })
        await contract.update(data)
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const contract = await contractType.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Type Not Found" })
        contract.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route