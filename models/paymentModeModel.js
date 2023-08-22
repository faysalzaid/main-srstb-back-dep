const db = require('../database')
const Sequelize = require('sequelize')


const paymentMode = db.define('PaymentMode', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    mode: {
        type: Sequelize.STRING,
        allowNull: false,
    },






}, {
    timestamps: false
})




module.exports = paymentMode