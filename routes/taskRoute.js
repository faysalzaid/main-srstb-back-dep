const express = require('express')

const route = express.Router()
const Task = require('../models/taskModel')
bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const moment = require('moment')
// require('moment/locale/af')
// moment.locale('af');



route.get('/', async(req, res) => {
    try {
        const task = await Task.findAll()
        res.json(task)
    } catch (error) {
        res.send({ error: error.message })
    }
})




route.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findOne({ where: { id } })
        if (!task) return res.send({ error: "Task Not Found" })
        res.json(task)
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.post('/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    console.log('From backend', data);
    try {
        const task = await Task.findOne({ where: { id } })
        if (!task) return res.send({ error: 'Task Not Found' })
            // const utask = await Task.update({ data }, { where: { id } })
        task.name = data.name
        task.status = data.status
        task.priority = data.priority
        task.estimatedHour = data.estimatedHour
        task.description = data.description
        task.starttime = data.starttime
        task.endtime = data.endtime
        task.pid = data.pid
        await task.save()
            // utask.save()
        const allTask = await Task.findAll()
        res.json(task)
    } catch (error) {
        res.send({ error: error.message })
    }
})


route.get('/delete/:id', async(req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findOne({ where: { id } })
        if (!task) return res.send({ error: "Task Not Found" })
        await task.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        res.send({ error: error.message })
    }
})


route.post('/', async(req, res) => {
    const data = req.body
    try {
        const task = await Task.create({
            name: data.name,
            status: data.status,
            priority: data.priority,
            estimatedHour: data.estimatedHour,
            description: data.description,
            starttime: data.starttime,
            endtime: data.endtime,
            pid: data.pid,
        });
        res.json(task)
    } catch (e) {
        res.send({ error: e.message });
    }
})





module.exports = route