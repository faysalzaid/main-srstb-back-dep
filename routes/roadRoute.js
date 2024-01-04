const express = require('express')

const route = express.Router()

const verifyJwt = require('../middlewares/verifyJwt')
const roadModel = require('../models/RoadModel')




route.get('/', verifyJwt, async(req, res) => {
    try {
        const road = await roadModel.findAll()
        res.send({
            road: road,
        })
    } catch (error) {

        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.get('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const road = await roadModel.findOne({ where: { id } })
        if (!road) return res.send({ error: "Road Not Found" })
        res.json(road)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const road = await roadModel.findOne({ where: { id } })
        if (!road) return res.send({ error: 'Road Not Found' })
        const findRoad = await roadModel.findOne({ where: { origin:data.origin,destination:data.destination } })
        if (!findRoad) return res.json({ error: "A road with this origin and destination is already registered" })
        await road.update(data)
        res.json(road)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const road = await roadModel.findOne({ where: { id } })
        if (!road) return res.send({ error: "Road Not Found" })
        await road.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        const findRoad = await roadModel.findOne({ where: { origin:data.origin,destination:data.destination } })
        if (findRoad) return res.json({ error: "A road with this origin and destination is already registered" })
        console.log('This is data',data);
        const road = await roadModel.create({
            origin: data.origin,
            destination: data.destination,
            pavementType: data.pavementType,
            year: data.year,
            maintained: data.maintained,
            condition: data.condition,
            length: data.length,
            width: data.width,
            design:data.design,
        })
        res.json('road')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg });
    }
})





module.exports = route