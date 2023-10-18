const { response } = require('express')
const express = require('express')

const projectModel = require('../models/projectModel')
const projectReportModel = require('../models/projectReportModel')
const route = express.Router()
const crypto = require('crypto')
const verifyJwt = require('../middlewares/verifyJwt')
const orderFileModel = require('../models/orderFileModel')
require('dotenv').config()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const order = await orderFileModel.findAll({ include: [{ model: projectModel }] })
        res.status(200).json(order)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})


route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
            // console.log(id, '::::::::::::::::::::::::::');
        const order = await orderFileModel.findOne({ where: { id } })
        if (!order) return res.status(404).json({ error: "Order File Not Found" })
        res.status(200).json(order)

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
            const order = await orderFileModel.create({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, date: data.date })
                // const findProject = await projectModel.findOne({ where: { id: data.ProjectId }, include: [] })
            return res.status(200).json(order)
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
        const order = await orderFileModel.findOne({ where: { id } })
        if (!order) return res.status(404).json({ error: "Order File Not Found" })
        if (req.files) {
            const orderFile = req.files.file
            const orderName = `${crypto.randomBytes(3).toString('hex')}${orderFile.name}`
            orderFile.mv(`./public/docs/${orderName}`)
            const savedFile = `${process.env.DOC_URL}/${orderName}`
            await order.update({ file: savedFile, date: data.date, BidId: data.BidId })
            return res.status(200).json(order)
        }
        await order.update({ file: savedFile, ProjectId: data.ProjectId, createdBy: data.createdBy, approvedBy: data.approvedBy, date: data.date })
        res.status(200).json(order)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})



route.post('/approve', verifyJwt, async(req, res) => {
    try {
        const id = req.body.id
        const data = req.body
        const order = await orderFileModel.findOne({ where: { id } })
        // console.log('THE BODY IS', req.body.ProjectId);
        if (!order) return res.status(404).json({ error: "Order File Not Found" })
        order.approvedBy = data.approvedBy
        // console.log('THE WEIRD STUFF IS ', !(order.approved));
        order.approved = !(order.approved)
        await order.save()
        const findPreport = await orderFileModel.findAll({
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
        const order = await orderFileModel.findOne({ where: { id } })
        if (!order) return res.status(404).json({ error: "Order File Not Found" })
        order.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route