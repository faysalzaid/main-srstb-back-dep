const db = require('../database')
const Sequelize = require('sequelize')


const Invoice = db.define('Invoice', {
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

    notes: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    totalPaid: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
    },
    amountDue: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
    },
    total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('Partially', 'Paid'),
        allowNull: false,
        defaultValue: "Partially"
    },
    sequential: {
        type: Sequelize.STRING,
        defaultValue: ' '
    }




}, {
    timestamps: false
})




module.exports = Invoice