const express = require('express')

const route = express.Router()
const softProjectModel = require('../models/softProjectModel')
const softProjectItemsModel = require('../models/softProjectItemsModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')




route.get('/', verifyJwt,async(req, res) => {
    try {
        const softProject = await softProjectItemsModel.findAll()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})




route.get('/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.put('/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    const data = req.body
    // console.log('From backend', data);
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: 'Project Not Found' })
            // const usoftProject = await softProjectItemsModel.update({ data }, { where: { id } })
        softProject.name = data.name
        softProject.quantity = data.quantity
        softProject.items = data.items
        softProject.total = data.total

        await softProject.save()
            // usoftProject.save()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})


route.delete('/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.json({ error: "Project Not Found" })
        if(softProject.status==="done") return res.json({error:"This project is finished Already"})
        await softProject.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        res.send({ error: error.message })
    }
})


route.post('/', verifyJwt,async(req, res) => {
    const data = req.body
    try {
        const findSoftProject = await softProjectItemsModel.findOne({where:{name:data.name}})
        if(findSoftProject) return res.json({error:"There is a project with this name already registered"})
        const softProject = await softProjectItemsModel.create({
            name:data.name,
            items:data.items,
            quantity:data.quantity,
            total:data.total,

        });
        res.json(softProject)
    } catch (e) {
        res.send({ error: e.message });
    }
})


route.post('/check/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        softProject.status='checked'
        softProject.checkedComment=data.checkedComment
        await softProject.save()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.post('/approve/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        softProject.status='approved'
        softProject.approvedComment=data.approvedComment
        await softProject.save()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.post('/done/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    // const data = req.body
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        softProject.status='done'
        await softProject.save()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.post('/reject/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const softProject = await softProjectItemsModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        softProject.status='rejected'
        softProject.rejectedComment=data.rejectedComment
        await softProject.save()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})





module.exports = route