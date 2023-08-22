const { response } = require('express')
const express = require('express')

const medicalAllowanceModel = require('../models/medicalAllowanceModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()


route.get('/', verifyJwt, async(req, res) => {
    try {
        const medical = await medicalAllowanceModel.findAll()
        res.status(200).json(medical)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const medical = await medicalAllowanceModel.findOne({ where: { id } })
        if (!medical) return res.status(404).json({ error: "medical Not Found" })
        res.status(200).json(medical)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {

        const data = req.body
        if (!req.files) {
            return res.json({ error: "file is required" })
        } else {
            const medicalFile = req.files.file
            const medicalName = `${crypto.randomBytes(3).toString('hex')}${medicalFile.name}`
            medicalFile.mv(`./public/docs/${medicalName}`)
            const savedFile = `${process.env.DOC_URL}/${medicalName}`
            const medical = await medicalAllowanceModel.create({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(medical)
        }

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const medical = await medicalAllowanceModel.findOne({ where: { id } })
        if (!medical) return res.status(404).json({ error: "medical Not Found" })
        if (req.files) {
            const medicalFile = req.files.file
            const medicalName = `${crypto.randomBytes(3).toString('hex')}${medicalFile.name}`
            medicalFile.mv(`./public/docs/${medicalName}`)
            const savedFile = `${process.env.DOC_URL}/${medicalName}`
            await medical.update({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(medical)
        }
        await medical.update(data)
        res.status(200).json(medical)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const medical = await medicalAllowanceModel.findOne({ where: { id } })
        if (!medical) return res.status(404).json({ error: "medical Not Found" })
        medical.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route