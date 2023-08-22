const db = require('../database')
const Sequelize = require('sequelize')
const { User } = require('./usersModel')

const Company = db.define('Company', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,

        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Company with this name already exists"
        }
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },



}, {
    timestamps: false
})

// Company.hasMany(User)



module.exports = Company