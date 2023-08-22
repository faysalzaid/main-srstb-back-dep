const { response } = require('express')
const express = require('express')
const verifyJwt = require('../middlewares/verifyJwt')
const contractModel = require('../models/contractModel')
const route = express.Router()




route.get('/', verifyJwt, async(req, res) => {
    try {
        const contract = await contractModel.findAll()
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const contract = await contractModel.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Not Found" })
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const checkProject = await contractModel.findOne({ where: { ProjectId: data.ProjectId } })
        if (checkProject) return res.json({ error: "This project has been registered in a contract" })
        const contract = await contractModel.create(data)
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const contract = await contractModel.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Not Found" })
        if (contract.ProjectId !== data.ProjectId) {
            const checkProject = await contractModel.findOne({ where: { ProjectId: data.ProjectId } })
            if (checkProject) return res.json({ error: "This project has been registered in a contract" })
        }

        await contract.update(data)
        res.status(200).json(contract)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const contract = await contractModel.findOne({ where: { id } })
        if (!contract) return res.status(404).json({ error: "Contract Not Found" })
        contract.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route