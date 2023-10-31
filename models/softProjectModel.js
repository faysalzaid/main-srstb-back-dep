const db = require('../database')
const Sequelize = require('sequelize')
const User = require('./usersModel')
    // const Project = require('./projectModel')


const softProject = db.define('SoftProject', {
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
    trainersNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    traineesNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    trainers: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    trainees: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    conferenceHall: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    stationary: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    refreshment: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
    },
    total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
    },
    days: {
        type: Sequelize.INTEGER,
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
    rejectedComment: {
        type: Sequelize.STRING,
        allowNull: true,
    },


})

// Project.hasMany(softProject)

module.exports = softProject