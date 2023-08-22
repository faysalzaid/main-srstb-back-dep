const express = require('express')

const route = express.Router()
const Company = require('../models/companyModel')
const slipModel = require('../models/slipModel')

bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Project = require('../models/projectModel')
const verifyJwt = require('../middlewares/verifyJwt')





route.get('/', verifyJwt, async(req, res) => {
    try {
        const slip = await slipModel.findAll()
        const countSlip = await slipModel.count()
        res.send({
            slip: slip,
            count: countSlip
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
        const slip = await slipModel.findOne({ where: { id } })
        if (!slip) return res.send({ error: "Slip Paper Not Found" })
        res.json(slip)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {

        const slip = await slipModel.findOne({ where: { id } })
        if (!slip) return res.send({ error: 'slip Not Found' })

        const project = await Project.findOne({ where: { id: data.ProjectId } })
        if (!project) return res.json({ error: "Project you Provided Doesnt Exist" })
        if (data.ProjectId !== slip.ProjectId) {
            const checkSlipProject = await slipModel.findOne({ where: { ProjectId: data.ProjectId } })
            if (checkSlipProject) return res.json({ error: "This project is already associated with letter" })
        }

        slip.to = data.to
        slip.date = data.date
        slip.subject = data.subject
        slip.message = data.message
        slip.ProjectId = data.ProjectId
        slip.UserId = data.UserId
        slip.createdBy = data.createdBy
        slip.status = data.status
        slip.save()
        res.json(slip)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const slip = await slipModel.findOne({ where: { id } })
        if (!slip) return res.send({ error: "Slip Not Found" })
        await slip.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const slipCheck = await slipModel.findOne({ where: { ProjectId: data.ProjectId } })
        if (slipCheck) return res.json({ error: "This project is already associated with letter" })
        const slip = await slipModel.create(data)
        res.json(slip)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg });
    }
})





module.exports = route