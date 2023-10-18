const express = require('express')
const route = express.Router()
const bidModel = require('../models/bidModel')
const projectModel = require('../models/projectModel')
const crypto = require('crypto')


const verifyjwt = require('../middlewares/verifyJwt')
const procurementFileModel = require('../models/procurementFileModel')
const ProcurementModel = require('../models/procurementModel')






route.get('/', verifyjwt, async(req, res) => {
    try {
        const procurement = await procurementFileModel.findAll({include:[ProcurementModel]})
        res.json(procurement)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})






route.get('/:id', verifyjwt, async(req, res) => {

    const id = req.params.id
    try {
        const procurement = await procurementFileModel.findOne({ where: { id } })
        if (!procurement) return res.send({ error: "procurement File Not Found" })
        res.json(procurement)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.put('/:id', verifyjwt, async(req, res) => {

    try {
        const id = req.params.id
        const data = req.body
        const procurement = await procurementFileModel.findOne({ where: { id } })
        if (!procurement) return res.send({ error: 'procurement File Not Found' })
        if (!req.files) {
            procurement.name = data.name
            procurement.ProcurementId = parseInt(data.ProcurementId)
            await procurement.save()
            return res.json(procurement)
        }
        const file = req.files.file
        const savedfile = `${crypto.randomBytes(4).toString('hex')}${file.name}`
        file.mv(`./public/docs/${savedfile}`)
        const savedfileUrl = `${process.env.DOC_URL}/${savedfile}`
        procurement.name = data.name
        procurement.file = savedfileUrl
        procurement.ProcurementId = parseInt(data.ProcurementId)
        await procurement.save()
        res.json(procurement)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const procurement = await procurementFileModel.findOne({ where: { id } })
        if (!procurement) return res.send({ error: "procurement File Not Found" })
        await procurement.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyjwt, async(req, res) => {


    try {
        const data = req.body
        const file = req.files.file
        const savedfile = `${crypto.randomBytes(4).toString('hex')}${file.name}`
        file.mv(`./public/docs/${savedfile}`)
        const savedfileUrl = `${process.env.DOC_URL}/${savedfile}`
        const procurement = await procurementFileModel.create({
            Name: data.name,
            file: savedfileUrl,
            ProcurementId:parseInt(data.ProcurementId)
        });

        res.json(procurement)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route