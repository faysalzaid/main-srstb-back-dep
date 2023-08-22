const { response } = require('express')
const express = require('express')
const route = express.Router()
const crypto = require('crypto')
const BlogModel = require('../models/blogModel')
const blogCategoryModel = require('../models/blogCategoryModel')


require('dotenv').config()

route.get('/', async(req, res) => {
    try {
        const blog = await BlogModel.findAll({ include: { model: blogCategoryModel } })
        res.status(200).json(blog)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })

    }

})

route.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
            // console.log(id, '::::::::::::::::::::::::::');
        const blog = await BlogModel.findOne({ where: { id }, include: { model: blogCategoryModel } })
        if (!blog) return res.status(404).json({ error: "Blog Not Found" })
        res.status(200).json(blog)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})

route.post('/', async(req, res) => {
    try {

        const data = req.body
        if (!req.files) {
            return res.json({ error: "Blog image is required" })
        } else {
            const blogFile = req.files.image
            const blogName = `${crypto.randomBytes(3).toString('hex')}${blogFile.name}`
            blogFile.mv(`./public/images/${blogName}`)
            const savedFile = `${process.env.BLOG_URL}/${blogName}`
            const blog = await BlogModel.create({ image: savedFile, BlogCategoryId: data.BlogCategoryId, title: data.title, description: data.description, user: data.user })
            return res.status(200).json(blog)
        }

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })

    }


})

route.put('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const blog = await BlogModel.findOne({ where: { id } })
        if (!blog) return res.status(404).json({ error: "Blog Not Found" })
        if (req.files) {
            const blogFile = req.files.image
            const blogName = `${crypto.randomBytes(3).toString('hex')}${blogFile.name}`
            blogFile.mv(`./public/images/${blogName}`)
            const savedFile = `${process.env.BLOG_URL}/${blogName}`
            await blog.update({ image: savedFile, BlogCategoryId: data.BlogCategoryId, title: data.title, description: data.description, date: data.date, user: data.user, trending: data.trending })
            return res.status(200).json(blog)
        }
        await blog.update(data)
        res.status(200).json(blog)

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.status(400).json({ error: msg })
    }


})

route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const blog = await BlogModel.findOne({ where: { id } })
        if (!blog) return res.status(404).json({ error: "Blog Not Found" })
        blog.destroy()
        res.status(200).send('deleted Successfully')

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }


})




module.exports = route