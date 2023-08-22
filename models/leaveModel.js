const db = require('../database')
const Sequelize = require('sequelize')


const LeaveModel = db.define('LeaveRequest', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "date is required"
            }
        }
    },

    numberOfDays: {
        type: Sequelize.STRING,
        validate: {

            notEmpty: {
                args: true,
                msg: "Number of Days Required"
            }
        }
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "date is required"
            }
        }
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "date is required"
            }
        }
    },

    comments: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Pending'
    },

}, {
    timestamps: false
})

// contract.hasMany(User)



module.exports = LeaveModel