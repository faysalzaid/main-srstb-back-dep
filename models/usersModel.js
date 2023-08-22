const db = require('../database')
const Sequelize = require('sequelize')
const Company = require('./companyModel')
const joi = require('joi')
require("dotenv").config()

const User = db.define('User', {
    id: {
        type: Sequelize.UUID,

        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email',

    },
    role: {
        type: Sequelize.ENUM('admin', 'manager', 'finance', 'design', 'client', 'roadquality', 'engineer', 'contractadmin', 'hr', 'planning', 'pRelation'),
        defaultValue: 'client',
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: `${process.env.PROFILE_URL}/default.png`,
        allowNull: true
    },
    refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
    }

})

function validate(user) {
    const schema = joi.object({
        name: joi.string().min(5).max(15).required(),
        email: joi.string().email().required(),
        password: joi.string().max(15).min(8).required()
    })
    joi.validate(user, schema)

}



module.exports.User = User
module.exports.validate = validate