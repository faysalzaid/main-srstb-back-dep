const db = require('../database')
const Sequelize = require('sequelize')


const payment = db.define('payment', {
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

    amountReceived: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    invoiced: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    createdBy: {
        type: Sequelize.STRING,
        allowNull: true
    }





}, {
    timestamps: false
})




module.exports = payment