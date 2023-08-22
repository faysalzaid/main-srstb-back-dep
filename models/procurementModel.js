const db = require('../database')
const Sequelize = require('sequelize')


const ProcurementModel = db.define('Procurement', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    timeToSell: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    budgetFrom: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    procurementMethod: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    procurementType: {
        type: Sequelize.STRING,
        defaultValue: 0
    }



}, {
    timestamps: true
})




module.exports = ProcurementModel