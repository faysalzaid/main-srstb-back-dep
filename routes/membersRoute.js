const express = require('express')
const route = express.Router()
const bidModel = require('../models/bidModel')
const crypto = require('crypto')
const membersModel = require('../models/membersModel')

const verifyjwt = require('../middlewares/verifyJwt')






route.get('/', verifyjwt, async(req, res) => {
    try {
        const member = await membersModel.findAll()
        res.json(member)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})






route.get('/:id', verifyjwt, async(req, res) => {

    const id = req.params.id
    try {
        const member = await membersModel.findOne({ where: { id } })
        if (!member) return res.send({ error: "member Not Found" })
        res.json(member)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.put('/:id', verifyjwt, async(req, res) => {

    try {
        const id = req.params.id
        const data = req.body
        const member = await membersModel.findOne({ where: { id } })
        if (!member) return res.send({ error: 'member Not Found' })
        if (!req.files) {
            member.name = data.name
            member.position = data.position
            member.description = data.description
            await member.save()
            return res.json(member)
        }
        const image = req.files.image
        const savedimage = `${crypto.randomBytes(4).toString('hex')}${image.name}`
        image.mv(`./public/profiles/${savedimage}`)
        const savedimageUrl = `${process.env.PROFILE_URL}/${savedimage}`
        member.name = data.name
        member.position = data.position
        member.description = data.description
        member.image = savedimageUrl
        await member.save()
        res.json(member)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const member = await membersModel.findOne({ where: { id } })
        if (!member) return res.send({ error: "member Not Found" })
        await member.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyjwt, async(req, res) => {


    try {
        const data = req.body
        const image = req.files.image
        const savedimage = `${crypto.randomBytes(4).toString('hex')}${image.name}`
        image.mv(`./public/profiles/${savedimage}`)
        const savedimageUrl = `${process.env.PROFILE_URL}/${savedimage}`
        const member = await membersModel.create({
            Name: data.name,
            image: savedimageUrl,
            position: data.position,
            description:data.description
        });

        res.json(member)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route