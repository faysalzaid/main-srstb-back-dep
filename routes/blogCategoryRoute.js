const express = require('express')
const BlogCategoryModel = require('../models/blogCategoryModel')
const verifyJwt = require('../middlewares/verifyJwt')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const leaveType = await BlogCategoryModel.findAll()
        res.status(200).json(leaveType)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const leaveType = await BlogCategoryModel.findOne({ where: { id } })
        if (!leaveType) return res.status(404).json({ error: "Category Not Found" })
        res.status(200).json(leaveType)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const leaveType = await BlogCategoryModel.create(data)
        res.status(200).json(leaveType)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const leaveType = await BlogCategoryModel.findOne({ where: { id } })
        if (!leaveType) return res.status(404).json({ error: "Category Not Found" })
        await leaveType.update(data)
        res.status(200).json(leaveType)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const leaveType = await BlogCategoryModel.findOne({ where: { id } })
        if (!leaveType) return res.status(404).json({ error: "Category Not Found" })
        leaveType.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route