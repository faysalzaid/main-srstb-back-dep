const { response } = require('express')
const express = require('express')
const awardLetterModel = require('../models/awardLetterModel')
const bidModel = require('../models/bidModel')
const projectModel = require('../models/projectModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')

require('dotenv').config()

route.get('/', verifyJwt, async(req, res) => {
    try {
        const awardLetter = await awardLetterModel.findAll({ include: [{ model: bidModel, include: [{ model: projectModel }] }] })
        res.status(200).json(awardLetter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
            // console.log(id, '::::::::::::::::::::::::::');
        const awardLetter = await awardLetterModel.findOne({ where: { id } })
        if (!awardLetter) return res.status(404).json({ error: "Award Letter Not Found" })
        res.status(200).json(awardLetter)

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
            const finBidId = await awardLetterModel.findOne({ where: { BidId: data.BidId } })
            if (finBidId) return res.json({ error: "This Bid Has Award Letter Already" })
            const awardLetterFile = req.files.file
            const awardLetterName = `${crypto.randomBytes(3).toString('hex')}${awardLetterFile.name}`
            awardLetterFile.mv(`./public/docs/${awardLetterName}`)
            const savedFile = `${process.env.DOC_URL}/${awardLetterName}`
            const awardLetter = await awardLetterModel.create({ file: savedFile, BidId: data.BidId })
            return res.status(200).json(awardLetter)
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
        const awardLetter = await awardLetterModel.findOne({ where: { id } })
        if (!awardLetter) return res.status(404).json({ error: "Award Letter Not Found" })
        if (req.files) {
            const awardLetterFile = req.files.file
            const awardLetterName = `${crypto.randomBytes(3).toString('hex')}${awardLetterFile.name}`
            awardLetterFile.mv(`./public/docs/${awardLetterName}`)
            const savedFile = `${process.env.DOC_URL}/${awardLetterName}`
            await awardLetter.update({ file: savedFile, date: data.date, BidId: data.BidId })
            return res.status(200).json(awardLetter)
        }
        await awardLetter.update({ file: data.file, date: data.date, BidId: data.BidId })
        res.status(200).json(awardLetter)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const awardLetter = await awardLetterModel.findOne({ where: { id } })
        if (!awardLetter) return res.status(404).json({ error: "Award Letter Not Found" })
        awardLetter.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route