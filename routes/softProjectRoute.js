const express = require('express')

const route = express.Router()
softProject = require('../models/softProjectModel')
const softProjectModel = require('../models/softProjectModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')




route.get('/', verifyJwt,async(req, res) => {
    try {
        const softProject = await softProjectModel.findAll()
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})




route.get('/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    try {
        const softProject = await softProjectModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: "Project Not Found" })
        res.json(softProject)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.put('/:id', verifyJwt,async(req, res) => {
    const id = req.params.id
    const data = req.body
    console.log('From backend', data);
    try {
        const softProject = await softProjectModel.findOne({ where: { id } })
        if (!softProject) return res.send({ error: 'Project Not Found' })
            // const usoftProject = await softProjectModel.update({ data }, { where: { id } })
        let days = parseFloat(data.days)
        let refreshment = parseFloat(data.refreshment)
        let traineesNo = parseFloat(data.traineesNo)
        let trainersNo = parseFloat(data.trainersNo)
        let total = parseFloat((traineesNo+trainersNo)*days*refreshment)
        softProject.name = data.name
        softProject.trainersNo = data.trainersNo
        softProject.traineesNo = data.traineesNo
        softProject.trainers = data.trainers
        softProject.trainees = data.trainees
        softProject.conferenceHall = data.conferenceHall
        softProject.stationary = data.stationary
        softProject.refreshment = data.refreshment
        softProject.days = data.days
        softProject.total = total

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
        const softProject = await softProjectModel.findOne({ where: { id } })
        if (!softProject) return res.json({ error: "Project Not Found" })
        if(softProject.status==="done") return res.json({error:"This project is finished Already"})
        await softProjectModel.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        res.send({ error: error.message })
    }
})


route.post('/', verifyJwt,async(req, res) => {
    const data = req.body
    try {
        let days = parseFloat(data.days)
        let refreshment = parseFloat(data.refreshment)
        let traineesNo = parseFloat(data.traineesNo)
        let trainersNo = parseFloat(data.trainersNo)
        let total = parseFloat((traineesNo+trainersNo)*days*refreshment)
        const findSoftProject = await softProjectModel.findOne({where:{name:data.name}})
        if(findSoftProject) return res.json({error:"There is a project with this name already registered"})
        const softProject = await softProjectModel.create({
            name:data.name,
            trainersNo: data.trainersNo,
            traineesNo: data.traineesNo,
            trainers: data.trainers,
            trainees: data.trainees,
            conferenceHall: data.conferenceHall,
            stationary: data.stationary,
            refreshment: data.refreshment,
            days: data.days,
            total:total,

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
        const softProject = await softProjectModel.findOne({ where: { id } })
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
        const softProject = await softProjectModel.findOne({ where: { id } })
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
        const softProject = await softProjectModel.findOne({ where: { id } })
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
        const softProject = await softProjectModel.findOne({ where: { id } })
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