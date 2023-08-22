const db = require('../database')
const Sequelize = require('sequelize')
const { User } = require('./usersModel')


const Project = db.define('Project', {
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
        type: Sequelize.ENUM("open", "pending", "active", "completed"),
        allowNull: false,
        defaultValue: "open",
    },
    place: {
        type: Sequelize.STRING,
        allowNull: true
    },
    consultant: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    distance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    starttime: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    endtime: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },

    percentage: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    totalCost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
    },

    utilizedCost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
    },
    remainingCost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0

    },
    physicalPerformance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0

    },
    financialPerformance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,

    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    color: {
        type: Sequelize.STRING,
        defaultValue: () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            let color = "#" + randomColor;
            return color
        }
    },
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, { timestamps: false })


module.exports = Project