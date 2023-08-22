const express = require('express')
const projectCommentModel = require('../models/projectCommentModel')
const verifyJwt = require('../middlewares/verifyJwt')
const projectModel = require('../models/projectModel')
const route = express.Router()



route.get('/', verifyJwt, async(req, res) => {
    try {
        const pcomment = await projectCommentModel.findAll({
            limit: 6,
            order: [
                ['date', 'DESC']
            ],
            include: [{ model: projectModel }]
        })
        res.status(200).json(pcomment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pcomment = await projectCommentModel.findOne({ where: { id } })
        if (!pcomment) return res.status(404).json({ error: "Comment Not Found" })
        res.status(200).json(pcomment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', verifyJwt, async(req, res) => {
    try {
        const data = req.body
        const pcomment = await projectCommentModel.create(data)
        res.status(200).json(pcomment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const pcomment = await projectCommentModel.findOne({ where: { id } })
        if (!pcomment) return res.status(404).json({ error: "Comment Not Found" })
        await pcomment.update(data)
        res.status(200).json(pcomment)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pcomment = await projectCommentModel.findOne({ where: { id } })
        if (!pcomment) return res.status(404).json({ error: "Comment Not Found" })
        await pcomment.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})


route.post('/approve/:id', verifyJwt, async(req, res) => {
    try {
        const id = req.params.id
        const pid = req.body.pId
        const data = req.body
        const pcomment = await projectCommentModel.findOne({ where: { id } })
        if (!pcomment) return res.status(404).json({ error: "Comment Not Found" })
        pcomment.approved = !(pcomment.approved)
        await pcomment.save()
        const allPComments = await projectCommentModel.findAll({ where: { ProjectId: pid } })
        res.status(200).json(allPComments)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})




module.exports = route