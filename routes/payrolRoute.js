const express = require('express')

const route = express.Router()
const payrolModel = require('../models/payrolModel')
const areaModel = require('../models/areaModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')





route.get('/', verifyJwt, async(req, res) => {
    try {
        const Payrol = await payrolModel.findAll()
        res.json(Payrol)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const Payrol = await payrolModel.findOne({ where: { id } })
        if (!Payrol) return res.send({ error: "Payrol Not Found" })
        res.json(Payrol)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.put('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const Payrol = await payrolModel.findOne({ where: { id } })
        if (!Payrol) return res.send({ error: 'Payrol Not Found' })
        const medicalAllowance = 5000 / 12
        const taxableAmount = data.basicSalary + medicalAllowance
        const hardshipAllowance = data.basicSalary * 0.4
        const totalEarnings = taxableAmount + hardshipAllowance
        let incomeTax;
        if (taxableAmount > 10900) {
            incomeTax = taxableAmount * 0.35 - 1500
        } else if (taxableAmount > 7800 && taxableAmount < 10900) {
            incomeTax = taxableAmount * 0.3 - 955
        } else if (taxableAmount > 5250 && taxableAmount < 7800) {
            incomeTax = taxableAmount * 0.25 - 565
        } else if (taxableAmount > 3200 && taxableAmount < 5250) {
            incomeTax = taxableAmount * 0.2 - 302.5
        } else if (taxableAmount > 1650 && taxableAmount < 3200) {
            incomeTax = taxableAmount * 0.15 - 142.5
        } else if (taxableAmount > 600 && taxableAmount < 1650) {
            incomeTax = taxableAmount * 0.1 - 60
        }
        const pfPension57 = 0.07 * data.basicSalary
        const totalDeduction = incomeTax + data.staffAdvance + pfPension57
        const pfPension1011 = data.basicSalary * 0.11
        const netPay = totalEarnings - totalDeduction

        await Payrol.update({
            EmployeeId: data.EmployeeId,
            DepartmentId: data.DepartmentId,
            basicSalary: data.basicSalary,
            medicalAllowance,
            taxableAmount,
            hardshipAllowance,
            staffAdvance: data.staffAdvance,
            pfPension57,
            totalDeduction,
            pfPension1011,
            netPay,
            incomeTax,
            totalEarnings,
            position: data.position,
            date: data.date


        })

        res.json(Payrol)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const Payrol = await payrolModel.findOne({ where: { id } })
        if (!Payrol) return res.send({ error: "Payrol Not Found" })
        await Payrol.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const medicalAllowance = 5000 / 12
        const taxableAmount = data.basicSalary + medicalAllowance
        const hardshipAllowance = data.basicSalary * 0.4
        const totalEarnings = taxableAmount + hardshipAllowance
        let incomeTax;
        if (taxableAmount > 10900) {
            incomeTax = taxableAmount * 0.35 - 1500
        } else if (taxableAmount > 7800 && taxableAmount < 10900) {
            incomeTax = taxableAmount * 0.3 - 955
        } else if (taxableAmount > 5250 && taxableAmount < 7800) {
            incomeTax = taxableAmount * 0.25 - 565
        } else if (taxableAmount > 3200 && taxableAmount < 5250) {
            incomeTax = taxableAmount * 0.2 - 302.5
        } else if (taxableAmount > 1650 && taxableAmount < 3200) {
            incomeTax = taxableAmount * 0.15 - 142.5
        } else if (taxableAmount > 600 && taxableAmount < 1650) {
            incomeTax = taxableAmount * 0.1 - 60
        }
        const pfPension57 = 0.07 * data.basicSalary
        const totalDeduction = incomeTax + data.staffAdvance + pfPension57
        const pfPension1011 = data.basicSalary * 0.11
        const netPay = totalEarnings - totalDeduction

        const payrol = await payrolModel.create({
            EmployeeId: data.EmployeeId,
            DepartmentId: data.DepartmentId,
            basicSalary: data.basicSalary,
            medicalAllowance,
            taxableAmount,
            hardshipAllowance,
            staffAdvance: data.staffAdvance,
            pfPension57,
            totalDeduction,
            pfPension1011,
            netPay,
            incomeTax,
            totalEarnings,
            position: data.position,
            date: data.date


        })
        res.json(payrol)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route