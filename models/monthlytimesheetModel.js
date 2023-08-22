const db = require('../database')
const Sequelize = require('sequelize')


const MonthlyTimesheetModel = db.define('Monthlytimesheet', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    attachment: {
        type: Sequelize.STRING,
        allowNull: false,
    },




}, {
    timestamps: false
})




module.exports = MonthlyTimesheetModel