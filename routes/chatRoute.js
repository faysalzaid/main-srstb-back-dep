const express = require('express')
const verifyJWT = require('../middlewares/verifyJwt')
const route = express.Router()
const { Chat, chatValidate } = require('../models/chatModel')
const {User}  = require('../models/usersModel')
const Jwt = require('jsonwebtoken')
const { Router } = require('express')
const nodemailer = require('nodemailer')
const { Sequelize } = require('sequelize')
require("dotenv").config()

route.get('/get/:to/', verifyJWT, async(req, res) => {
    const to = req.params.to
    const user = req.user
    try {
        getchChats(user, to, res)
    } catch (error) {
        res.send({ error: error.message })
    }
})

async function getchChats (user, to, res) {
    const chats = await Chat.findAll({
        where: Sequelize.or(Sequelize.and({from: user.id, to: to}), Sequelize.and({to: user.id, from: to}))
    })
    let unseenChats = await Chat.findAll({ where: { to: user.id, seen: 1 } });
    unseenChats.map((uch)=>{
        uch.seen = 0;
        uch.save()
    })
    let result = []
    chats.map((chat)=>{
        var date = Date(chat.updatedAt)
    
        result.push({id: chat.id, message:chat.message, type: chat.type, me: chat.to === to ? true : false, date: date})
    })
    return res.json(result)
}


// route.get('/:id', async(req, res) => {
//     const id = req.params.id
//     try {
//         const chat = await Chat.findOne({ where: { id } })
//         if (!chat) return res.send({ error: "Chat not found" })
//         res.json(chat)

//     } catch (error) {
//         res.send({ error: error.message })
//     }
// })
route.delete('/delete/:id/:to', verifyJWT, async(req, res) => {
    const id = req.params.id
    const user = req.user
    const to = req.params.to
    try {
        const chat = await Chat.findOne({ where: { id } })
        if (!chat) {
            getchChats(user, to, res)
        }
        if(chat.from === user.id) {
           chat.destroy().then(()=>{
             getchChats(user, to, res)
           })
        }

         

    } catch (error) {
        res.send({ error: error.message })
    }
})

route.put('/edit/:id/:to', verifyJWT, async(req, res) => {
    const data = req.body
    const user = req.user
    const id = req.params.id
    const to = req.params.to
    try {
        const chat = await Chat.findOne({ where: { id } })
        if (!chat) {
            getchChats(user, to, res)
        }

        if(data.message)
          chat.message = data.message;

        if(chat.from === user.id) {
           chat.save().then(()=>{
             getchChats(user, to, res)
           })
        }

    } catch (error) {
        res.send({ error: error.message })
    }
})


route.post('/send', verifyJWT, async(req, res) => {
    const from = req.user.id
    try {
        const error = chatValidate(req.body)
        if (error) return res.send({ error: error.details[0].message })
        const { message, to } = req.body;
        Chat.create({message:message, from: from, to: to }).then(chat => {
            getchChats(req.user, to, res)
        })
    } catch (error) {
        res.send({ error: error.message })
    }
})

route.get('/count', verifyJWT, async(req, res) => {
    try {
            const fid = req.user.id;
            const newChat = await Chat.count({
                where: {to: fid, seen: 1}
            })
           res.send({count: newChat})
    } catch (error) {
        res.send({error: error.message})
    }
})

route.get('/count/:to', verifyJWT, async(req, res) => {
    try {
            const fid = req.user.id;
            const to = req.params.to;
            const newChat = await Chat.count({
                where: {to: fid, from: to, seen: 1}
            })
           res.send({count: newChat})
    } catch (error) {
        res.send({error: error.message})
    }
})


 async function getUsersList(users, user, res) {
    const result = []
        const promises = users.map(async (userTo) => {
            const to = userTo.id;
            let lastMessage = "No messages yet!";
            let newChatCount = 0;
            if (user.id !== userTo.id) {
                const lastChat = await Chat.findOne({
                    where: Sequelize.or(Sequelize.and({from: user.id, to: to}), Sequelize.and({to: user.id, from: to})),
                    order: [ [ 'createdAt', 'DESC' ]],
                })
                await Chat.count({
                    where: {to: user.id, from: to, seen: 1}
                }).then((newCount)=>{
                    newChatCount = newCount;
                })
                if(lastChat) {
                    lastMessage = lastChat.message;
                }
                result.push({ id: userTo.id, name: userTo.name, image: userTo.image, lastChat: lastMessage, new: newChatCount })
            }
        })
        await Promise.all(promises)
        res.send(result)
 } 
  

route.get('/userslist/show', verifyJWT, async(req, res)=>{
    try {
        const user = req.user
        const users = await User.findAll({
            order: [
                ['id', 'ASC'],
                //['name', 'ASC'],
            ],
        })

        getUsersList(users, user, res)
    } catch(error) {
        res.send({error: error.message});
    }
})



route.get('/userslist/fetch/:to', verifyJWT, async(req, res)=>{
    try {
        const to = req.params.to
        const from = req.user.id

        const users = await User.findAll({
            where: {
                id: [from, to]
            }
        });
        const result = []
        users.map((user)=>{
            if(user.id !== req.user.id)
              result.push({id: user.id, name: user.name, image:user.image, from: false})
            else 
              result.push({id: user.id, name: user.name, image:user.image, from: true})
        })
        

        res.send(result)
    } catch(error) {
        res.send({error: error.message});
    }
})

module.exports = route