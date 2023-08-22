const express = require('express')
require('dotenv').config()
const route = express.Router()
const crypto = require('crypto')
const settingsModel = require('../models/settingsModel')

// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require('../middlewares/verifyJwt')





route.get('/', async(req, res) => {
    try {
        const settings = await settingsModel.findAll()

        res.json(
            settings

        )
    } catch (error) {

        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const settings = await settingsModel.findOne({ where: { id } })
        if (!settings) return res.send({ error: "settings Not Found" })
        res.json(settings)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.put('/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const settings = await settingsModel.findOne({ where: { id } })
        if (!settings) return res.send({ error: 'settings Not Found' })
        if (!req.files) {
            settings.name = data.name
            settings.address1 = data.address1
            settings.address2 = data.address2
            settings.save()
        } else {
            let logoUrl
            let loginLogoUrl
            if (settings.logo !== data.logo) {
                const logo = req.files.logo
                const movedlogo = `${crypto.randomBytes(3).toString('hex')}${logo.name}`
                logo.mv(`./public/${movedlogo}`)
                logoUrl = `${process.env.LOGOS_URL}/${movedlogo}`
            } else {
                logoUrl = data.logo
            }

            if (settings.loginlogo !== data.loginlogo) {
                const loginlogo = req.files.loginlogo
                const movedloginlogo = `${crypto.randomBytes(3).toString('hex')}${loginlogo.name}`
                loginlogo.mv(`./public/${movedloginlogo}`)
                loginLogoUrl = `${process.env.LOGOS_URL}/${movedloginlogo}`
            } else {
                loginLogoUrl = data.loginlogo
            }


            settings.name = data.name
            settings.address1 = data.address1
            settings.address2 = data.address2
            settings.logo = logoUrl
            settings.loginlogo = loginLogoUrl
            settings.save()
        }

        res.json(settings)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const settings = await settingsModel.findOne({ where: { id } })
        if (!settings) return res.send({ error: "settings Not Found" })
        await settings.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/', verifyJwt, async(req, res) => {
    const data = req.body
    try {
        if (!req.files) return res.json({ error: "logos required" })
        const logo = req.files.logo
        const loginlogo = req.files.loginlogo
        const movedlogo = `${crypto.randomBytes(3).toString('hex')}${logo.name}`
        const movedloginlogo = `${crypto.randomBytes(3).toString('hex')}${loginlogo.name}`
        logo.mv(`./public/${movedlogo}`)
        loginlogo.mv(`./public/${movedloginlogo}`)
        const logoUrl = `${process.env.LOGOS_URL}/${movedlogo}`
        const loginLogoUrl = `${process.env.LOGOS_URL}/${movedloginlogo}`
        const settings = await settingsModel.create({
            logo: logoUrl,
            loginlogo: loginLogoUrl,
            name: data.name,
            address1: data.address1,
            address2: data.address2
        })
        res.json(settings)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route