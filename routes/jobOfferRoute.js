const { response } = require('express')
const express = require('express')
const attachmentModel = require('../models/attachmentModel')
const jobOfferModel = require('../models/jobOfferLetterModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()


route.get('/', verifyJwt, async(req, res) => {
    try {
        const jobOffer = await jobOfferModel.findAll()
        res.status(200).json(jobOffer)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const jobOffer = await jobOfferModel.findOne({ where: { id } })
        if (!jobOffer) return res.status(404).json({ error: "jobOffer Not Found" })
        res.status(200).json(jobOffer)

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
            const jobOfferFile = req.files.file
            const jobOfferName = `${crypto.randomBytes(3).toString('hex')}${jobOfferFile.name}`
            jobOfferFile.mv(`./public/docs/${jobOfferName}`)
            const savedFile = `${process.env.DOC_URL}/${jobOfferName}`
            const jobOffer = await jobOfferModel.create({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(jobOffer)
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
        const jobOffer = await jobOfferModel.findOne({ where: { id } })
        if (!jobOffer) return res.status(404).json({ error: "jobOffer Not Found" })
        if (req.files) {
            const jobOfferFile = req.files.file
            const jobOfferName = `${crypto.randomBytes(3).toString('hex')}${jobOfferFile.name}`
            jobOfferFile.mv(`./public/docs/${jobOfferName}`)
            const savedFile = `${process.env.DOC_URL}/${jobOfferName}`
            await jobOffer.update({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(jobOffer)
        }
        await jobOffer.update(data)
        res.status(200).json(jobOffer)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const jobOffer = await jobOfferModel.findOne({ where: { id } })
        if (!jobOffer) return res.status(404).json({ error: "jobOffer Not Found" })
        await jobOffer.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route