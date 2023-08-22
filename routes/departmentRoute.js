const express = require('express')

const route = express.Router()
const Department = require('../models/departmentModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')

// const moment = require('moment')
// require('moment/locale/af')
// moment.locale('af');



route.get('/', verifyJwt, async(req, res) => {
    try {
        const dep = await Department.findAll()
        res.json(dep)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const dep = await Department.findOne({ where: { id } })
        if (!dep) return res.send({ error: "Department Not Found" })
        res.json(dep)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.get('/name/:name', verifyJwt, async(req, res) => {
    const name = req.params.name
    try {
        const dep = await Department.findOne({ where: { name } })
        if (!dep) return res.send({ error: "Department Not Found" })
        res.json(dep)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const dep = await Department.findOne({ where: { id } })
        if (!dep) return res.send({ error: 'Department Not Found' })
        dep.name = data.name
        dep.save()
        res.json(dep)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const dep = await Department.findOne({ where: { id } })
        if (!dep) return res.send({ error: "Department Not Found" })
        await dep.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const dep = await Department.create({
            name: data.name,
        });
        res.json(dep)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route