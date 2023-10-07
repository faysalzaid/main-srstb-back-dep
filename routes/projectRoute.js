const express = require('express')

const route = express.Router()
const Project = require('../models/projectModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bidModel = require('../models/bidModel');
const budgetModel = require('../models/budgetModel')
const taskModel = require('../models/taskModel')
const invoiceModel = require('../models/invoiceModel')
const budgetTrackModel = require('../models/budgetTrackModel')
const moment = require('moment')
const verifyJwt = require('../middlewares/verifyJwt')
const awardLetterModel = require('../models/awardLetterModel')
const procurementModel = require('../models/procurementModel')
const projectReport = require('../models/projectReportModel')
const Invoice = require('../models/invoiceModel')
const yearlyBudget = require('../models/budgetModel')
const contractModel = require('../models/contractModel')
require('moment/locale/af')
moment.locale('af');



route.get('/', verifyJwt, async(req, res) => {
    try {
        const pr = await Project.findAll({
            order: [
                ['name', 'ASC']
            ],
            include: [{ model: bidModel }, { model: budgetModel, include: [budgetTrackModel] }, { model: invoiceModel }]
        })
        const countAllPr = await Project.count()
        const countCompleted = await Project.count({ where: { status: "completed" } })
        const countPending = await Project.count({ where: { status: "pending" } })
        const countActive = await Project.count({ where: { status: "active" } })
        res.json({ projects: pr, count: countAllPr, completed: countCompleted, pending: countPending, active: countActive })
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const pr = await Project.findOne({
            where: { id },
            include: [{ model: bidModel, include: { model: awardLetterModel } }, {
                    model: budgetModel,
                    include: [{
                        model: budgetTrackModel,
                        order: [
                            ["date", "DESC"]
                        ]
                    }]
                },
                { model: invoiceModel },
                { model: procurementModel },
                {
                    model: projectReport,
                    order: [
                        ["createdAt", "ASC"]
                    ],
                },

            ]
        })
        if (!pr) return res.send({ error: "Project Not Found" })
        res.json(pr)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.get('/name/:name', async(req, res) => {
    const name = req.params.name
    try {
        const pr = await Project.findOne({ where: { name } })
        if (!pr) return res.send({ error: "Project Not Found" })
        res.json(pr)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const pr = await Project.findOne({ where: { id }, include: [{ model: bidModel }, { model: budgetModel, include: [budgetTrackModel] }, { model: invoiceModel }, ] })
        if (!pr) return res.send({ error: 'Project Not Found' })
        const utilized = parseFloat(data.utilizedCost)
        const total = parseFloat(data.totalCost)
        let remCost = total - utilized
        const financialCalc = utilized / total * 100
        pr.name = data.name
        pr.status = data.status
        pr.consultant = data.consultant
        pr.place = data.place
        pr.year = data.year
        pr.description = data.description
        pr.starttime = data.starttime
        pr.endtime = data.endtime
        pr.percentage = data.percentage
        pr.totalCost = total
        pr.utilizedCost = utilized
        pr.remainingCost = parseFloat(remCost)
        pr.financialPerformance = parseFloat(financialCalc)
        pr.physicalPerformance = parseFloat(data.physicalPerformance)
        pr.BidId = data.BidId
        pr.engineer = data.engineer
        pr.CompanyId = data.CompanyId
        pr.distance = parseFloat(data.distance)
        await pr.save()
        res.json(pr)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/approve/:id', async(req, res) => {
    const id = req.params.id
    const fProject = await Project.findOne({
        where: { id },
        include: [{ model: bidModel },
            {
                model: budgetModel,
                include: [{
                    model: budgetTrackModel,
                    order: [
                        ["date", "DESC"]
                    ]
                }]
            },
            { model: invoiceModel },
        ]
    })
    if (!fProject) return res.json({ error: "Project Not Found" })
    fProject.approved = !(fProject.approved)
    await fProject.save()
    res.json(fProject)
})

route.delete('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const pr = await Project.findOne({ where: { id } })
        if (!pr) return res.send({ error: "Project Not Found" })
        const fInvoice = await Invoice.findOne({ where: { ProjectId: pr.id } })
        if (fInvoice) return res.json({ error: "There is inoice related to this project, delete it first" })
        const yrlyBudget = await yearlyBudget.findOne({ where: { ProjectId: pr.id } })
        if (yrlyBudget) return res.json({ error: "There is budget related to this , delete the budgets first" })
        const contract = await contractModel.findOne({ where: { ProjectId: pr.id } })
        if (contract) return res.json({ error: "There is contract related to this project, delete it first " })
        await pr.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        // if (req.files === null) return res.send({ error: "All data are required" })
        const project = await Project.findOne({ where: { name: data.name } })
        if (project) return res.send({ error: 'Project with this name exists' })
        const utilized = parseFloat(data.utilizedCost)
        const total = parseFloat(data.totalCost)
        const remCost = total - utilized
        const financialCalc = utilized / total * 100
        const pr = await Project.create({
            name: data.name,
            status: data.status,
            place: data.place,
            description: data.description,
            consultant: data.consultant,
            starttime: data.starttime,
            endtime: data.endtime,
            percentage: data.percentage,
            year: data.year,
            totalCost: total,
            utilizedCost: utilized,
            remainingCost: parseFloat(remCost),
            financialPerformance: parseFloat(financialCalc),
            physicalPerformance: parseFloat(data.physicalPerformance),
            BidId: data.BidId,
            engineer: data.engineer,
            CompanyId: data.CompanyId,
            distance: parseFloat(data.distance)
        });
        res.json(pr)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/bidselect/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {

        const pr = await Project.findOne({ where: { id }, include: [{ model: bidModel }, { model: budgetModel, include: [budgetTrackModel] }, { model: invoiceModel }, ] })
        if (!pr) return res.send({ error: "Project Not Found" })
        const allBids = await bidModel.update({ selected: 0 }, { where: { ProjectId: id } })
        const sBid = await bidModel.findOne({ where: { id: data.BidId } })
        if (!sBid) return res.json({ error: "Bid Related Couldn't be Found" })
        sBid.selected = 1
        pr.BidId = data.BidId
        await sBid.save()
        await pr.save()
        res.json(pr)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }

})




module.exports = route