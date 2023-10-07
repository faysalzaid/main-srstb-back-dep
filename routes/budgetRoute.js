const express = require('express')

const route = express.Router()
const Project = require('../models/projectModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bidModel = require('../models/bidModel');
const budgetModel = require('../models/budgetModel')
const budgetTrackModel = require('../models/budgetTrackModel')
const moment = require('moment')
const verifyJwt = require('../middlewares/verifyJwt')
const InvoiceModel = require('../models/invoiceModel')
const paymentModel = require('../models/paymentModel')
require('moment/locale/af')
moment.locale('af');



route.get('/', verifyJwt, async(req, res) => {
    try {
        const budget = await budgetModel.findAll({ include: [budgetTrackModel] })
        res.json(budget)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const budget = await budgetModel.findOne({ where: { id } })
        if (!budget) return res.send({ error: "budget Not Found" })
        res.json(budget)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body

    try {


        const budget = await budgetModel.findOne({ where: { id } })
        if (!budget) return res.status(404).send({ error: "Budget not found" })
        const projectModel = await Project.findOne({ where: { id: budget.ProjectId } })
            // const checkUtilizedBudgetWIthAllocatedBudget = data.utilizedBudget > data.allocatedBudget
            // const checkUtilizedAgainstRemainingBudget = data.utilizedBudget > budget.remainingBudget
        const utilized = parseFloat(data.utilized)
        const utilizedBudget = parseFloat(data.utilizedBudget)
        const pRemaining = parseFloat(projectModel.remainingCost)
        const pTotalCost = parseFloat(projectModel.totalCost)
        const bremaining = parseFloat(budget.remainingBudget)
        const bUtilizedBudget = parseFloat(budget.utilizedBudget)
        const allocated = parseFloat(data.allocatedBudget)
        if (utilized > bremaining) return res.send({
            error: `Allocating Budget should't be more than remaining amount cost of ${bremaining} please re-edit data`
        })
        if (allocated > pTotalCost) return res.send({
            error: `The new Allocated budget shouldn't be more than Total cost of ${pTotalCost} please re-edit data`
        })

        if (utilized > bremaining) return res.send({
                error: `The new utilized budget shouldn't be more than remaining cost of ${bremaining} please re-edit data`
            })
            // if (checkUtilizedAgainstRemainingBudget) return res.send({ error: `Utilizing budget  ${data.utilized} is more than remaining budget of ${budget.remainingBudget} please re-edit data` })
        if (utilizedBudget > allocated) return res.send({ error: "Utilizing budget shouldn't be more than allocated budget please re-edit data" })

        let remBudget = allocated - utilizedBudget
            // End
            // Monitoring project's utilized cost remaining cost and financialPerformance
        const addCost = utilizedBudget - bUtilizedBudget
        const pUtilizedCost = parseFloat(projectModel.utilizedCost)
        const utilizedProjectCost = pUtilizedCost + addCost
        projectModel.utilizedCost = utilizedProjectCost
        projectModel.remainingCost = pTotalCost - utilizedProjectCost
        projectModel.financialPerformance = utilizedProjectCost / pTotalCost * 100
        await projectModel.save()
            // End

        // const bTrackUtilized = parseFloat(data.utilized)
        const budgetTrack = await budgetTrackModel.create({ date: data.date, yearlyBudgetId: id, utilized: utilized, createdBy: data.createdBy })
        const financialCalc = utilizedBudget / allocated * 100
        budget.year = data.year
        budget.allocatedBudget = allocated
        budget.utilizedBudget = utilizedBudget
        budget.remainingBudget = remBudget
        budget.ProjectId = data.ProjectId
        budget.financialPerformance = financialCalc
        await budget.save()
        const allBudgets = await budgetModel.findAll({
            where: {
                ProjectId: data.ProjectId
            },
            include: [{ model: budgetTrackModel, order: ['date', 'DESC'] }],

        })
        res.json(allBudgets)


    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', async(req, res) => {
    const id = req.params.id
    try {
        const budget = await budgetModel.findOne({ where: { id } })
        if (!budget) return res.send({ error: "Budget Not Found" })
        await budget.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const FINDALLBUDGETS = await budgetModel.findAll()
        if (FINDALLBUDGETS.length > 0) {
            const projectModel = await Project.findOne({ where: { id: data.ProjectId } })
            const pTotalCost = parseFloat(projectModel.totalCost)
            const pRemaining = parseFloat(projectModel.remainingCost)
            const allocated = parseFloat(data.allocatedBudget)
            const utilized = parseFloat(data.utilizedBudget)
            if (allocated > pTotalCost) return res.json({ error: `
                                Allocated budget cannot be more than ${ parseFloat(pTotalCost).toLocaleString() } ` })
            const checkTotalAndUtilized = utilized > pTotalCost
            if (checkTotalAndUtilized) return res.json({ error: `
                                Utilized budget cannot be more than ${ parseFloat(pTotalCost).toLocaleString() } ` })
            const checkRemainingCostAgainstAllocated = allocated > parseFloat(pRemaining)
            if (checkRemainingCostAgainstAllocated) return res.json({ error: `
                                Allocated budget cannot be more than ${ parseFloat(pRemaining) }
                                of remaining amount ` })
            const checkUtilizedAgainstAllocated = utilized > allocated
            if (checkUtilizedAgainstAllocated) return res.json({ error: `
                                Utilized budget cannot be more than Allocated ${ allocated }` })
            const remCost = allocated - utilized
            const financialCalc = utilized / allocated * 100
            const pr = await budgetModel.create({
                year: data.year,
                allocatedBudget: allocated,
                utilizedBudget: utilized,
                remainingBudget: remCost,
                ProjectId: data.ProjectId,
                financialPerformance: financialCalc

            });
            const pUtilizedCost = parseFloat(projectModel.utilizedCost)
            const utilizedPlus = pUtilizedCost + utilized
            projectModel.utilizedCost = utilizedPlus
            projectModel.remainingCost = pTotalCost - utilizedPlus
            projectModel.financialPerformance = utilizedPlus / pTotalCost * 100
            await projectModel.save()
            res.json(pr)



        } else {
            const projectModel = await Project.findOne({ where: { id: data.ProjectId } })
            const allocated = parseFloat(data.allocatedBudget)
            const pTotalCost = parseFloat(projectModel.totalCost)
            const utilized = parseFloat(data.utilizedBudget)
            const checkTotalAndAllocated = allocated > pTotalCost
            if (checkTotalAndAllocated) return res.json({ error: `
                                Allocated budget cannot be more than ${parseFloat(pTotalCost).toLocaleString()}` })
            const checkTotalAndUtilized = utilized > pTotalCost
            if (checkTotalAndUtilized) return res.json({ error: `
                                Utilized budget cannot be more than ${parseFloat(pTotalCost).toLocaleString()}` })

            const checkUtilizedAgainstAllocated = utilized > allocated
            if (checkUtilizedAgainstAllocated) return res.json({ error: `
                                Utilized budget cannot be more than Allocated ${ parseFloat(allocated).toLocaleString() }` })
            const remCost = allocated - utilized
            const financialCalc = utilized / allocated * 100
            const pr = await budgetModel.create({
                year: data.year,
                allocatedBudget: allocated,
                utilizedBudget: utilized,
                remainingBudget: remCost,
                ProjectId: data.ProjectId,
                financialPerformance: financialCalc

            });
            const pUtilizedCost = parseFloat(projectModel.utilizedCost)
            const utilizedPlus = pUtilizedCost + utilized
            projectModel.utilizedCost = utilizedPlus
            projectModel.remainingCost = pTotalCost - utilizedPlus
            projectModel.financialPerformance = utilizedPlus / pTotalCost * 100
            await projectModel.save()
            res.json(pr)
        }


    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/budgettrackDelete/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const findBudgetTrack = await budgetTrackModel.findOne({ where: { id } })
        if (!findBudgetTrack) return res.status(404).json({ error: "Budget Installment Not Found" })
            // console.log(findBudgetTrack);
        if (findBudgetTrack.invoiced) {
            const invoiceCheck = await InvoiceModel.findOne({ where: { id: data.InvoiceId } })
            if (!invoiceCheck) return res.json({ error: "Invoice not found" })
            const totalPaid = parseFloat(invoiceCheck.totalPaid)
            const bUtilized = parseFloat(findBudgetTrack.utilized)
            const total = parseFloat(invoiceCheck.total)
            const newInvoicePaid = totalPaid - bUtilized
            invoiceCheck.amountDue = total - newInvoicePaid
            invoiceCheck.totalPaid = newInvoicePaid
            await invoiceCheck.save()
            const payment = await paymentModel.findOne({ where: { InvoiceId: data.InvoiceId, amountReceived: findBudgetTrack.utilized, date: findBudgetTrack.updatedAt } })
            if (!payment) return res.json({ error: "Payment related couldn't be found" })
            await payment.destroy()
            const budget = await budgetModel.findOne({ where: { id: findBudgetTrack.yearlyBudgetId } })
            if (!budget) return res.json({ error: "Budget Id Not Found" })
            const fBudgetUtilized = parseFloat(budget.utilizedBudget)
            const fbudgetAllocated = parseFloat(budget.allocatedBudget)
            const newUtilized = fBudgetUtilized - bUtilized
            budget.utilizedBudget = newUtilized
            budget.remainingBudget = fbudgetAllocated - newUtilized
            budget.financialPerformance = newUtilized / fbudgetAllocated * 100
            await budget.save()
            const projectModel = await Project.findOne({ where: { id: budget.ProjectId } })
            const pUtilizedCost = parseFloat(projectModel.utilizedCost)
            const totalCost = parseFloat(projectModel.totalCost)
            const utilizedPlus = pUtilizedCost - bUtilized
            projectModel.utilizedCost = utilizedPlus
            projectModel.remainingCost = totalCost - utilizedPlus
            projectModel.financialPerformance = utilizedPlus / totalCost * 100
            await projectModel.save()
            await findBudgetTrack.destroy()
            const allBudgets = await budgetModel.findAll({
                where: {
                    ProjectId: data.ProjectId
                },
                include: [{ model: budgetTrackModel, order: ['date', 'ASC'] }],

            })
            return res.json(allBudgets)
        }
        const budget = await budgetModel.findOne({ where: { id: findBudgetTrack.yearlyBudgetId } })
        if (!budget) return res.json({ error: "Budget Id Not Found" })
        const bUtilized = parseFloat(budget.utilizedBudget)
        const fbTrackUtilized = parseFloat(findBudgetTrack.utilized)
        const newUtilized = bUtilized - fbTrackUtilized
        const bAllocated = parseFloat(budget.allocatedBudget)
        budget.utilizedBudget = newUtilized
        budget.remainingBudget = bAllocated - newUtilized
        budget.financialPerformance = newUtilized / bAllocated * 100
        await budget.save()
        const projectModel = await Project.findOne({ where: { id: budget.ProjectId } })
        const pUtilized = parseFloat(projectModel.utilizedCost)
        const pTotalCost = parseFloat(projectModel.totalCost)
        const utilizedPlus = pUtilized - fbTrackUtilized
        projectModel.utilizedCost = utilizedPlus
        projectModel.remainingCost = pTotalCost - utilizedPlus
        projectModel.financialPerformance = utilizedPlus / pTotalCost * 100
        await projectModel.save()
        await findBudgetTrack.destroy()
        const allBudgets = await budgetModel.findAll({
            where: {
                ProjectId: data.ProjectId
            },
            include: [{ model: budgetTrackModel, order: ['date', 'ASC'] }],

        })
        res.json(allBudgets)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

})





route.post('/approve/:id', async(req, res) => {
    const id = req.params.id
    const findBudget = await budgetModel.findOne({ where: { id } })
    if (!findBudget) return res.json({ error: "Budget Couldnt be found" })
    findBudget.approved = !(findBudget.approved)
    await findBudget.save()
    const findAllBudgets = await budgetModel.findAll({ include: [budgetTrackModel] })
    res.json(findAllBudgets)

})




module.exports = route