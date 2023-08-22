const db = require('../database')
const Sequelize = require('sequelize')


const PayrolModel = db.define('Payrol', {
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
    position: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    basicSalary: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    medicalAllowance: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    taxableAmount: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    hardshipAllowance: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    totalEarnings: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    incomeTax: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    staffAdvance: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    pfPension57: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    totalDeduction: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    pfPension1011: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    netPay: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },




}, {
    timestamps: false
})




module.exports = PayrolModel