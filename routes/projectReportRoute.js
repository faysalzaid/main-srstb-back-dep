const { response } = require('express')
const express = require('express')

const projectModel = require('../models/projectModel')
const projectReportModel = require('../models/projectReportModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()


route.get('/', verifyJwt, async(req, res) => {
    try {
        const projectR = await projectReportModel.findAll({ include: [{ model: projectModel }] })
        res.status(200).json(projectR)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})


route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
            // console.log(id, '::::::::::::::::::::::::::');
        const projectR = await projectReportModel.findOne({ where: { id } })
        if (!projectR) return res.status(404).json({ error: "project Report Not Found" })
        res.status(200).json(projectR)

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
            const projectR = await projectReportModel.create({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, date: data.date })
                // const findProject = await projectModel.findOne({ where: { id: data.ProjectId }, include: [] })
            return res.status(200).json(projectR)
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
        const projectR = await projectReportModel.findOne({ where: { id } })
        if (!projectR) return res.status(404).json({ error: "project Report Not Found" })
        if (req.files) {
            const projectRFile = req.files.file
            const projectRName = `${crypto.randomBytes(3).toString('hex')}${projectRFile.name}`
            projectRFile.mv(`./public/docs/${projectRName}`)
            const savedFile = `${process.env.DOC_URL}/${projectRName}`
            await projectR.update({ file: savedFile, date: data.date, BidId: data.BidId })
            return res.status(200).json(projectR)
        }
        await projectR.update({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, approvedBy: data.approvedBy, date: data.date })
        res.status(200).json(projectR)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})



route.post('/approve', verifyJwt, async(req, res) => {
    try {
        const id = req.body.id
        const data = req.body
        const projectR = await projectReportModel.findOne({ where: { id } })
        console.log('THE BODY IS', req.body.ProjectId);
        if (!projectR) return res.status(404).json({ error: "project Report Not Found" })
        projectR.approvedBy = data.approvedBy
        console.log('THE WEIRD STUFF IS ', !(projectR.approved));
        projectR.approved = !(projectR.approved)
        await projectR.save()
        const findPreport = await projectReportModel.findAll({
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
        const projectR = await projectReportModel.findOne({ where: { id } })
        if (!projectR) return res.status(404).json({ error: "project Report Not Found" })
        projectR.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route