const express = require('express')

const route = express.Router()
const Company = require('../models/companyModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyjwt = require('../middlewares/verifyJwt')
const Project = require('../models/projectModel')





route.get('/', verifyjwt, async(req, res) => {
    try {
        const cp = await Company.findAll({
            order: [
                ["name", "ASC"]
            ],
        })
        const countCp = await Company.count()
        res.send({
            company: cp,
            count: countCp
        })
    } catch (error) {

        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.get('/name/:name', verifyjwt, async(req, res) => {
    const name = req.params.name
    const cp = await Company.findOne({ where: { name } })
    if (!cp) return res.send({ error: "Company Not found" })
    res.json(cp)
})


route.get('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const cp = await Company.findOne({ where: { id } })
        if (!cp) return res.send({ error: "Company Not Found" })
        res.json(cp)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.put('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const cp = await Company.findOne({ where: { id } })
        if (!cp) return res.send({ error: 'Company Not Found' })
        cp.name = data.name
        cp.location = data.location
        cp.UserId = data.UserId
        await cp.save()
        res.json(cp)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const cp = await Company.findOne({ where: { id } })
        const finRelatedProject = await Project.findOne({ where: { CompanyId: id } })
        if (finRelatedProject) return res.json({ error: `This company is Used in Project ${finRelatedProject.name}, Please Update The Project First` })
        if (!cp) return res.send({ error: "Company Not Found" })
        await cp.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyjwt, async(req, res) => {
    const data = req.body
    try {
        const cp = await Company.create(data)
        res.json(cp)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route