const db = require('../database')
const Sequelize = require('sequelize')
const User = require('./usersModel')
const Project = require('./projectModel')


const Task = db.define('Task', {
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
    status: {
        type: Sequelize.ENUM("pending", "active", "finished"),
        allowNull: true,
        defaultValue: "pending",
    },
    priority: {
        type: Sequelize.ENUM("high", "low", "moderate"),
        defaultValue: 'low',
        allowNull: true

    },
    estimatedHour: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    starttime: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    endtime: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },

})



module.exports = Task