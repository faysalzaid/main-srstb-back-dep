const db = require('../database')
const Sequelize = require('sequelize')
    // const User = require('./usersModel')
    // const Project = require('./projectModel')


const Designation = db.define('Designation', {
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

// Project.hasMany(Designation)

module.exports = Designation