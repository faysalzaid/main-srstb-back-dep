const express = require('express')
const paymentModel = require('../models/paymentModel')
const invoiceModel = require('../models/invoiceModel')
const budgetModel = require('../models/budgetModel')
const budgetTrackModel = require('../models/budgetTrackModel')
const verifyJwt = require('../middlewares/verifyJwt')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const payment = await paymentModel.findAll()
        res.status(200).json(payment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const payment = await paymentModel.findOne({ where: { id } })
        if (!payment) return res.json({ error: "payment Not Found" })
        res.status(200).json(payment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const invoiceCheck = await invoiceModel.findOne({ where: { id: data.InvoiceId } })
        if (!invoiceCheck || invoiceCheck === null) return res.json({ error: "Invoice Doesn't exist" })
        const amountReceived = parseFloat(data.amountReceived)
        const total = parseFloat(invoiceCheck.total)
        const totalPaid = parseFloat(invoiceCheck.totalPaid)
        const checkTotalOnInvoice = amountReceived > total
        if (checkTotalOnInvoice) return res.json({ error: `Receiving amount should be less than or equall to ${invoiceCheck.amountDue}` })
        const checkAmountReceivedAgaintAmountDue = amountReceived > invoiceCheck.amountDue
        if (checkAmountReceivedAgaintAmountDue) return res.json({ error: `Receiving amount should't be more than due amount of ${invoiceCheck.amountDue}` })
        const newInvoicePaidTotal = amountReceived + totalPaid
        if (newInvoicePaidTotal > total) return res.json({
            error: `Payment should be less than or equall to ${total}`
        })
        invoiceCheck.totalPaid = newInvoicePaidTotal
        invoiceCheck.amountDue = total - newInvoicePaidTotal
        await invoiceCheck.save()


        if (data.budgetTrackId !== undefined) {
            const budgetTrack = await budgetTrackModel.findOne({ where: { id: data.budgetTrackId } })
            budgetTrack.invoiced = 1
            await budgetTrack.save()
        }
        const payment = await paymentModel.create({ date: data.date, amountReceived: amountReceived, InvoiceId: data.InvoiceId, invoiced: data.invoiced, createdBy: data.createdBy })
        const allBudgets = await budgetModel.findAll({
            where: {
                ProjectId: data.ProjectId
            },
            include: [budgetTrackModel]
        })
        res.status(200).json(allBudgets)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }


})



route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const payment = await paymentModel.findOne({ where: { id } })
        if (!payment) return res.json({ error: "payment Not Found" })
        const invoiceCheck = await invoiceModel.findOne({ where: { id: data.InvoiceId } })
        if (!invoiceCheck) return res.json({ error: "Invoice doesnt exist" })
        const amountReceived = parseFloat(data.amountReceived)
        const total = parseFloat(invoiceCheck.total)
        const totalPaid = parseFloat(invoiceCheck.totalPaid)
        const checkTotalOnInvoice = amountReceived > total
        if (checkTotalOnInvoice) return res.json({
            error: `Receiving amount should be less than or equall to ${invoiceCheck.amountDue}`
        })

        const newInvoicePaidTotal = amountReceived + totalPaid
        if (newInvoicePaidTotal > total) return res.status(405).json({
            error: `Payment should be less than or equall to ${ total }`
        })
        invoiceCheck.totalPaid = newInvoicePaidTotal
        invoiceCheck.amountDue = total - newInvoicePaidTotal
        await invoiceCheck.save()

        await payment.update(data)
        res.status(200).json(payment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id

        const payment = await paymentModel.findOne({ where: { id } })
        if (!payment) return res.json({ error: "payment Not Found" })
        const invoiceCheck = await invoiceModel.findOne({ where: { id: payment.InvoiceId } })
        if (!invoiceCheck) return res.json({ error: "Invoice doesnt exist" })
        const totalPaid = parseFloat(invoiceCheck.totalPaid)
        const pReceived = parseFloat(payment.amountReceived)
        const total = parseFloat(invoiceCheck.total)
        const newPayment = totalPaid - pReceived
        invoiceCheck.totalPaid = newPayment
        invoiceCheck.amountDue = total - newPayment
        await invoiceCheck.save()
        await payment.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route