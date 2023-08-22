const express = require('express')
const contractType = require('../models/contractTypeModel')
const leaveTypeModel = require('../models/leaveTypeModel')
const leaveModel = require('../models/leaveModel')
const verifyJwt = require('../middlewares/verifyJwt')
const { employeeModel } = require('../models/employeeModel')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const leave = await leaveModel.findAll({ include: [{ model: employeeModel }] })
        res.status(200).json(leave)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const leave = await leaveModel.findOne({ where: { id } })
        if (!leave) return res.status(404).json({ error: "leave Not Found" })
        res.status(200).json(leave)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const leave = await leaveModel.create({
            EmployeeId: data.EmployeeId,
            LeaveTypeId: data.LeaveTypeId,
            approvedBy: data.approvedBy,
            checkedBy: data.checkedBy,
            comments: data.comments,
            createdBy: data.createdBy,
            date: data.date,
            endDate: data.endDate,
            numberOfDays: data.numberOfDays,
            startDate: data.startDate,
            status: data.status,

        })

        return res.status(200).json(leave)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: error })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const leave = await leaveModel.findOne({ where: { id } })
        if (!leave) return res.status(404).json({ error: "leave Type Not Found" })
        await leave.update(data)
        res.status(200).json(leave)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }

})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const leave = await leaveModel.findOne({ where: { id } })
        if (!leave) return res.status(404).json({ error: "leave Type Not Found" })
        leave.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route