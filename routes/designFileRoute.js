const { response } = require('express')
const express = require('express')

const projectModel = require('../models/projectModel')
const projectReportModel = require('../models/projectReportModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
const designFileModel = require('../models/designFileModel')
const variationFileModel = require('../models/variationFileModel')
require('dotenv').config()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const design = await designFileModel.findAll({ include: [{ model: projectModel }] })
        res.status(200).json(design)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})


route.get('/single/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const design = await designFileModel.findAll({ where:{ProjectId:id} })
        res.status(200).json(design)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})


route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
            // console.log(id, '::::::::::::::::::::::::::');
        const design = await designFileModel.findOne({ where: { id } })
        if (!design) return res.status(404).json({ error: "Design Not Found" })
        res.status(200).json(design)

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
            const report = req.files.file
            const reportName = `${crypto.randomBytes(3).toString('hex')}${report.name}`
            report.mv(`./public/docs/${reportName}`)
            const savedFile = `${process.env.DOC_URL}/${reportName}`
            const design = await designFileModel.create({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, date: data.date })
                // const findProject = await projectModel.findOne({ where: { id: data.ProjectId }, include: [] })
            return res.status(200).json(design)
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
        const design = await designFileModel.findOne({ where: { id } })
        if (!design) return res.status(404).json({ error: "Design Not Found" })
        if (req.files) {
            const designFile = req.files.file
            const designName = `${crypto.randomBytes(3).toString('hex')}${designFile.name}`
            designFile.mv(`./public/docs/${designName}`)
            const savedFile = `${process.env.DOC_URL}/${designName}`
            await design.update({ file: savedFile, date: data.date, BidId: data.BidId })
            return res.status(200).json(design)
        }
        await design.update({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, approvedBy: data.approvedBy, date: data.date })
        res.status(200).json(design)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})



route.post('/approve', verifyJwt, async(req, res) => {
    try {
        const id = req.body.id
        const data = req.body
        const design = await designFileModel.findOne({ where: { id } })
        // console.log('THE BODY IS', req.body.ProjectId);
        if (!design) return res.status(404).json({ error: "Design Not Found" })
        design.approvedBy = data.approvedBy
        // console.log('THE WEIRD STUFF IS ', !(design.approved));
        design.approved = !(design.approved)
        await design.save()
        const findPreport = await designFileModel.findAll({
                where: { ProjectId: data.ProjectId }
            })
            // console.log('THE PROJECT IS ', findPreport);
        res.status(200).json(findPreport)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})


route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const design = await designFileModel.findOne({ where: { id } })
        if (!design) return res.status(404).json({ error: "Design Not Found" })
        await design.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route