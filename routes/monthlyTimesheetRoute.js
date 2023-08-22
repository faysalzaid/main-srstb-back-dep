const express = require('express')
const route = express.Router()
const bidModel = require('../models/bidModel')
const crypto = require('crypto')
const MonthlyTimesheetModel = require('../models/monthlytimesheetModel')


const verifyjwt = require('../middlewares/verifyJwt')


// const verifyJwt = require('../middlewares/verifyJwt');
// const { upload } = require('../imageMiddleware')
// const { clientModel, validate } = require('../models/clientModel')
// const moment = require('moment')
// require('moment/locale/af') 
// moment.locale('af');




route.get('/', verifyjwt, async(req, res) => {
    try {
        const timesheet = await MonthlyTimesheetModel.findAll()
        res.json(timesheet)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})






route.get('/:id', verifyjwt, async(req, res) => {

    const id = req.params.id
    try {
        const timesheet = await MonthlyTimesheetModel.findOne({ where: { id } })
        if (!timesheet) return res.send({ error: "timesheet Not Found" })
        res.json(timesheet)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.put('/:id', verifyjwt, async(req, res) => {

    try {
        const id = req.params.id
        const data = req.body
        const timesheet = await MonthlyTimesheetModel.findOne({ where: { id } })
        if (!timesheet) return res.send({ error: 'timesheet Not Found' })
        if (!req.files) {
            timesheet.EmployeeId = data.EmployeeId
            timesheet.date = data.date
            timesheet.save()
            return res.json(timesheet)
        }
        const attachment = req.files.attachment
        const savedattachment = `${crypto.randomBytes(4).toString('hex')}${attachment.name}`
        attachment.mv(`./public/timesheet/${savedattachment}`)
        const savedAttachmentUrl = `${process.env.TIMESHEET_URL}/${savedattachment}`
        timesheet.EmployeeId = data.EmployeeId
        timesheet.attachment = savedAttachmentUrl
        timesheet.date = data.date
        timesheet.save()
        res.json(timesheet)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const timesheet = await MonthlyTimesheetModel.findOne({ where: { id } })
        if (!timesheet) return res.send({ error: "timesheet Not Found" })
        await timesheet.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyjwt, async(req, res) => {


    try {
        const data = req.body
        const attachment = req.files.attachment
        const savedattachment = `${crypto.randomBytes(4).toString('hex')}${attachment.name}`
        attachment.mv(`./public/timesheet/${savedattachment}`)
        const savedAttachmentUrl = `${process.env.TIMESHEET_URL}/${savedattachment}`
        const timesheet = await MonthlyTimesheetModel.create({
            EmployeeId: data.EmployeeId,
            attachment: savedAttachmentUrl,
            date: data.date
        });

        res.json(timesheet)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route