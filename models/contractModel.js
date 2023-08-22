const db = require('../database')
const Sequelize = require('sequelize')


const contractModel = db.define('Contract', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "Subject is required"
            }
        }
    },
    contractValue: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
        defaultValue: 0

    },

    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "Start Date is required"
            }
        }
    },

    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "End Date is required"
            }
        }
    },
    status: {
        type: Sequelize.ENUM('signed', 'unsigned'),
        defaultValue: "unsigned"
    }




}, {})

// contract.hasMany(User)



module.exports = contractModel