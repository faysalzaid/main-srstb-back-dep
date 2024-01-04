const db = require('../database')
const Sequelize = require('sequelize')
const User = require('./usersModel')
    // const Project = require('./projectModel')


const softProjectItem = db.define('SoftProjectItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    items: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
    },

    status: {
        type: Sequelize.ENUM('pending','checked','approved','done','rejected'),
        defaultValue: 'pending',
        allowNull: true
    },
    approvedComment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    checkedComment: {
        type: Sequelize.STRING,
        allowNull: true,
    },



})

// Project.hasMany(softProject)

module.exports = softProjectItem