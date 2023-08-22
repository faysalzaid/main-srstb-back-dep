const { response } = require('express')
const express = require('express')
const contractModel = require('../models/contractModel')
const attachmentModel = require('../models/attachmentModel')

const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()

route.get('/', verifyJwt, async(req, res) => {
    try {
        const attachment = await attachmentModel.findAll()
        res.status(200).json(attachment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const attachment = await attachmentModel.findOne({ where: { id } })
        if (!attachment) return res.status(404).json({ error: "attachment Not Found" })
        res.status(200).json(attachment)

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
            const attachmentFile = req.files.attach
            const fileType = attachmentFile.mimetype
            const attachmentName = `${crypto.randomBytes(3).toString('hex')}${attachmentFile.name}`
            attachmentFile.mv(`./public/docs/${attachmentName}`)
            const savedFile = `${process.env.DOC_URL}/${attachmentName}`
            const attachment = await attachmentModel.create({ attach: savedFile, ContractId: data.ContractId, name: attachmentName, fileType })
            res.status(200).json(attachment)
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
        const attachment = await attachmentModel.findOne({ where: { id } })
        if (!attachment) return res.status(404).json({ error: "attachment Not Found" })
        await attachment.update(data)
        res.status(200).json(attachment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const attachment = await attachmentModel.findOne({ where: { id } })
        if (!attachment) return res.status(404).json({ error: "attachment Not Found" })
        attachment.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route