const express = require('express')

const route = express.Router()
const arvhiveModel = require('../models/archiveModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Department = require('../models/departmentModel')
const verifyJwt = require('../middlewares/verifyJwt')
require('dotenv').config()





route.get('/', verifyJwt, async(req, res) => {
    try {
        const archive = await arvhiveModel.findAll()
            // const countarchive = await arvhiveModel.count()
        res.send(archive)
    } catch (error) {

        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
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
        const archive = await arvhiveModel.findOne({ where: { id } })
        if (!archive) return res.send({ error: "archive Not Found" })
        res.json(archive)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }
})

route.put('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        console.log(id, 'Thisisid::::::::::::::::::::::');
        const archive = await arvhiveModel.findOne({ where: { id } })
        console.log(archive, "thisisArvhive:::::::::::::::;");
        const findDepartment = await Department.findOne({ where: { id: data.DepartmentId } })
        if (!findDepartment) return res.json({ error: "Related Department Not Found" })
        if (!req.files) {
            archive.filename = data.filename
            archive.fileUrl = data.fileUrl
            archive.date = data.date
            archive.DepartmentId = data.DepartmentId
            await archive.save()
            return res.json(archive)

        } else {
            const file = req.files.fileUrl
            savedFile = `${crypto.randomBytes(4).toString('hex')}${file.name}`
            file.mv(`./public/docs/${savedFile}`)
            const fileUrl = `${process.env.DOC_URL}/${savedFile}`
            archive.filename = data.filename,
                archive.fileUrl = fileUrl,
                archive.date = data.date,
                archive.DepartmentId = data.DepartmentId
            await archive.save()
            return res.json(archive)

        }
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }
})


route.delete('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const archive = await arvhiveModel.findOne({ where: { id } })
        if (!archive) return res.send({ error: "archive Not Found" })
        await archive.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        if (req.files) {
            const findDepartment = await Department.findOne({ where: { id: data.DepartmentId } })
            if (!findDepartment) return res.json({ error: "Related Department Not Found" })
            const file = req.files.fileUrl
            savedFile = `${crypto.randomBytes(4).toString('hex')}${file.name}`
            file.mv(`./public/docs/${savedFile}`)
            const fileUrl = `${process.env.DOC_URL}/${savedFile}`
            const archive = await arvhiveModel.create({
                filename: data.filename,
                fileUrl: fileUrl,
                date: data.date,
                DepartmentId: data.DepartmentId
            })
            return res.json(archive)

        } else {
            return res.json({ error: "File Is required" })
        }
        res.json(archive)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }
})





module.exports = route