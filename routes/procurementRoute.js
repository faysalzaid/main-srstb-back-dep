const express = require('express')
const projectCommentModel = require('../models/projectCommentModel')
const procurementModel = require('../models/procurementModel')
const projectModel = require('../models/projectModel')
const verifyJwt = require('../middlewares/verifyJwt')
const Project = require('../models/projectModel')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const procurement = await procurementModel.findAll({ include: [{ model: projectModel }] })
        res.status(200).json(procurement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const procurement = await procurementModel.findOne({ where: { id }, include: [{ model: projectModel }] })
        if (!procurement) return res.status(404).json({ error: "Procurement Not Found" })
        res.status(200).json(procurement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const findProcurement = await procurementModel.findOne({ where: { ProjectId: data.ProjectId } })
        if (findProcurement) return res.json({ error: "This project has a Procurement Already" })
        const procurement = await procurementModel.create(data)
        res.status(200).json(procurement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const procurement = await procurementModel.findOne({ where: { id } })
        if (!procurement) return res.status(404).json({ error: "Procurement Not Found" })
        if (procurement.ProjectId !== data.ProjectId) {
            const findProcurement = await procurementModel.findOne({ where: { ProjectId: data.ProjectId } })
            if (findProcurement) return res.json({ error: "This project has a Procurement Already" })
        }
        await procurement.update(data)
        res.status(200).json(procurement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const procurement = await procurementModel.findOne({ where: { id } })
        if (!procurement) return res.status(404).json({ error: "Procurement Not Found" })
        procurement.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})


route.post('/approve/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pid = req.body.pId
        const data = req.body
        const procurement = await procurementModel.findOne({ where: { id } })
        if (!procurement) return res.status(404).json({ error: "Procurement Not Found" })
        procurement.approved = !(procurement.approved)
        await procurement.save()
        const allprocurements = await procurementModel.findAll({ where: { ProjectId: pid } })
        res.status(200).json(allprocurements)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})




module.exports = route