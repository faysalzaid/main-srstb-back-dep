const db = require('../database')
const Sequelize = require('sequelize')
const { User } = require('./usersModel')


const yearlyBudget = db.define('yearlyBudget', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },


    year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    allocatedBudget: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
    },

    utilizedBudget: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
    },
    remainingBudget: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,

    },
    financialPerformance: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,

    },

    invoiced: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            let color = "#" + randomColor;
            return color
        }
    },


}, { timestamps: false })



module.exports = yearlyBudget