const express = require('express')

const route = express.Router()
const Designation = require('../models/designationModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')

// const moment = require('moment')
// require('moment/locale/af')
// moment.locale('af');



route.get('/', verifyJwt, async(req, res) => {
    try {
        const des = await Designation.findAll()
        res.json(des)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const des = await Designation.findOne({ where: { id } })
        if (!des) return res.send({ error: "Designation Not Found" })
        res.json(des)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})






route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const des = await Designation.findOne({ where: { id } })
        if (!des) return res.send({ error: 'Designation Not Found' })
        des.name = data.name
        des.DepartmentId = data.DepartmentId
        des.save()
        res.json(des)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})
route.get('/name/:name', verifyJwt, async(req, res) => {
    const name = req.params.name
    try {
        const des = await Designation.findOne({ where: { name } })
        if (!des) return res.send({ error: "Designation Not Found" })
        res.json(des)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const des = await Designation.findOne({ where: { id } })
        if (!des) return res.send({ error: "Designation Not Found" })
        await des.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const des = await Designation.create({
            name: data.name,
            DepartmentId: data.DepartmentId
        });
        res.json(des)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route