const db = require('../database')
const Sequelize = require('sequelize')
const User = require('./usersModel')
    // const Project = require('./projectModel')


const Department = db.define('Department', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})

// Project.hasMany(Department)

module.exports = Department