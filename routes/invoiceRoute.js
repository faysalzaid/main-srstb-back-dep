const express = require('express')
const paymentModel = require('../models/paymentModel')
const invoiceModel = require('../models/invoiceModel')
const Project = require('../models/projectModel')
const route = express.Router()
const verifyJwt = require('../middlewares/verifyJwt')


route.get('/', verifyJwt, async(req, res) => {
    try {
        const invoice = await invoiceModel.findAll({ include: [paymentModel] })
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const invoice = await invoiceModel.findOne({ where: { id }, include: paymentModel })
        if (!invoice) return res.status(404).json({ error: "invoice Not Found" })
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const checkProject = await invoiceModel.findOne({ where: { ProjectId: data.ProjectId } })
        if (checkProject) return res.status(400).json({ error: "This project has been registered in a invoice" })
        const totalPaid = parseFloat(data.totalPaid)
        const total = parseFloat(data.total)
        const checkTotalAndTotalPaid = totalPaid > total
        if (checkTotalAndTotalPaid) return res.status(400).json({ error: "Total paid cannot be greater than Total" })
        const dueAmount = total - totalPaid
        const invoice = await invoiceModel.create({
            date: data.date,
            ProjectId: data.ProjectId,
            UserId: data.UserId,
            totalPaid: totalPaid,
            total: total,
            notes: data.notes,
            amountDue: parseFloat(dueAmount),
            PaymentModeId: data.PaymentModeId,
            sequential: data.sequential
        })
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const invoice = await invoiceModel.findOne({ where: { id }, include: { model: paymentModel } })
        if (!invoice) return res.status(404).json({ error: "invoice Not Found" })
        const totalPaid = parseFloat(data.totalPaid)
        const total = parseFloat(data.total)
        if (invoice.ProjectId !== data.ProjectId) {
            const checkProject = await invoiceModel.findOne({ where: { ProjectId: data.ProjectId } })
                // console.log('::::::::::::', invoice.ProjectId !== data.ProjectId);
            if (checkProject || checkProject === null) return res.status(400).json({ error: "This project has been registered in an invoice" })
        }
        const checkTotalAndTotalPaid = totalPaid > total
        if (checkTotalAndTotalPaid) return res.status(400).json({ error: `Total paid cannot be greater than Total` })
        const dueAmount = total - totalPaid
        await invoice.update({
            date: data.date,
            ProjectId: data.ProjectId,
            UserId: data.UserId,
            totalPaid: totalPaid,
            total: total,
            notes: data.notes,
            amountDue: parseFloat(dueAmount),
            PaymentModeId: data.PaymentModeId,
            sequential: data.sequential

        })
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const invoice = await invoiceModel.findOne({ where: { id } })
        if (!invoice) return res.status(404).json({ error: "invoice Not Found" })
        const findPayment = await paymentModel.findOne({ where: { InvoiceId: id } })
        if (findPayment) return res.json({ error: "There is Payment related To this Account, Please Delete The Payment First" })
        await invoice.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




route.post('/update/:id', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const invoice = await invoiceModel.findOne({ where: { id }, include: { model: paymentModel } })
        if (!invoice) return res.status(404).json({ error: "invoice Not Found" })
        const total = parseFloat(invoice.total)
        const totalPaid = parseFloat(invoice.totalPaid)
        const newAmount = parseFloat(data.newAmount)
        const newTotal = total+newAmount
        const newDueAmount = parseFloat(newTotal-totalPaid)
        invoice.total=parseFloat(newTotal)
        invoice.amountDue=parseFloat(newDueAmount)
        await invoice.save()
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})


route.post('/reverseupdate/:id', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const invoice = await invoiceModel.findOne({ where: { id }, include: { model: paymentModel } })
        if (!invoice) return res.status(404).json({ error: "invoice Not Found" })
        const total = parseFloat(invoice.total)
        const totalPaid = parseFloat(invoice.totalPaid)
        const minusAmount = parseFloat(data.minusAmount)
        const newTotal = total-minusAmount
        const newDueAmount = parseFloat(newTotal-totalPaid)
        invoice.total=parseFloat(newTotal)
        invoice.amountDue=parseFloat(newDueAmount)
        await invoice.save()
        res.status(200).json(invoice)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})




module.exports = route