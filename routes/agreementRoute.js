const { response } = require('express')
const express = require('express')
const agreementModel = require('../models/agreementModel')
const jobOfferModel = require('../models/jobOfferLetterModel')
const route = express.Router()

const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()

route.get('/', verifyJwt, async(req, res) => {
    try {
        const agreement = await agreementModel.findAll()
        res.status(200).json(agreement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const agreement = await agreementModel.findOne({ where: { id } })
        if (!agreement) return res.status(404).json({ error: "agreement Not Found" })
        res.status(200).json(agreement)

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
            const agreementFile = req.files.file
            const agreementName = `${crypto.randomBytes(3).toString('hex')}${agreementFile.name}`
            agreementFile.mv(`./public/docs/${agreementName}`)
            const savedFile = `${process.env.DOC_URL}/${agreementName}`
            const agreement = await agreementModel.create({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(agreement)
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
        const agreement = await agreementModel.findOne({ where: { id } })
        if (!agreement) return res.status(404).json({ error: "agreement Not Found" })
        if (req.files) {
            const agreementFile = req.files.file
            const agreementName = `${crypto.randomBytes(3).toString('hex')}${agreementFile.name}`
            agreementFile.mv(`./public/docs/${agreementName}`)
            const savedFile = `${process.env.DOC_URL}/${agreementName}`
            await agreement.update({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(agreement)
        }
        await agreement.update(data)
        res.status(200).json(agreement)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const agreement = await agreementModel.findOne({ where: { id } })
        if (!agreement) return res.status(404).json({ error: "agreement Not Found" })
        agreement.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route