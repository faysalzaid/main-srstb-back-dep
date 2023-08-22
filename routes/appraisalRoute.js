const { response } = require('express')
const express = require('express')

const appraisalModel = require('../models/appraisalModels')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()

route.get('/', verifyJwt, async(req, res) => {
    try {
        const appraisal = await appraisalModel.findAll()
        res.status(200).json(appraisal)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const appraisal = await appraisalModel.findOne({ where: { id } })
        if (!appraisal) return res.status(404).json({ error: "appraisal Not Found" })
        res.status(200).json(appraisal)

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
            const appraisalFile = req.files.file
            const appraisalName = `${crypto.randomBytes(3).toString('hex')}${appraisalFile.name}`
            appraisalFile.mv(`./public/docs/${appraisalName}`)
            const savedFile = `${process.env.DOC_URL}/${appraisalName}`
            const appraisal = await appraisalModel.create({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(appraisal)
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
        const appraisal = await appraisalModel.findOne({ where: { id } })
        if (!appraisal) return res.status(404).json({ error: "appraisal Not Found" })
        if (req.files) {
            const appraisalFile = req.files.file
            const appraisalName = `${crypto.randomBytes(3).toString('hex')}${appraisalFile.name}`
            appraisalFile.mv(`./public/docs/${appraisalName}`)
            const savedFile = `${process.env.DOC_URL}/${appraisalName}`
            await appraisal.update({ file: savedFile, EmployeeId: data.EmployeeId })
            res.status(200).json(appraisal)
        }
        await appraisal.update(data)
        res.status(200).json(appraisal)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const appraisal = await appraisalModel.findOne({ where: { id } })
        if (!appraisal) return res.status(404).json({ error: "appraisal Not Found" })
        appraisal.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route