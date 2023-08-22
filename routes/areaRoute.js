const express = require('express')

const route = express.Router()
const Company = require('../models/companyModel')
const slipModel = require('../models/slipModel')
const areaModel = require('../models/areaModel')

bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')





route.get('/', verifyJwt, async(req, res) => {
    try {
        const area = await areaModel.findAll()
        const countArea = await areaModel.count()
        res.send({
            area: area,
            count: countArea
        })
    } catch (error) {

        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

// route.get('/name/:name', verifyJwt,async(req, res) => {
//     const name = req.params.name
//     const cp = await Company.findOne({ where: { name } })
//     if (!cp) return res.send({ error: "Company Not found" })
//     res.json(cp)
// })


route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const area = await areaModel.findOne({ where: { id } })
        if (!area) return res.send({ error: "Area Not Found" })
        res.json(area)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const area = await areaModel.findOne({ where: { id } })
        if (!area) return res.send({ error: 'area Not Found' })
        area.name = data.name
        await area.save()
        res.json(area)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const area = await areaModel.findOne({ where: { id } })
        if (!area) return res.send({ error: "Area Not Found" })
        await area.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const area = await areaModel.create(data)
        res.json(area)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route