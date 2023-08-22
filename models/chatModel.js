const db = require('../database')
const Sequelize = require('sequelize')
const Company = require('./companyModel')
const joi = require('joi')

const Chat = db.define('Chat', {
    id: {
        type: Sequelize.INTEGER,

        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    from: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
    },
    to: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
    },
    type: {
        type: Sequelize.ENUM('text', 'image', 'video', 'file'),
        allowNull: false,
        unique: false,
        defaultValue: 'text',
    },
    seen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: 1,
    },


})

function validate(chat) {
    const schema = {
        message: joi.string().min(1).required(),
    }
    joi.validate(chat, schema)

}





module.exports.Chat = Chat
module.exports.chatValidate = validate