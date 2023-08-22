const db = require('../database')
const Sequelize = require('sequelize')


const LeaveTypeModel = db.define('LeaveType', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "type is required"
            }
        }
    }

}, {
    timestamps: false
})

// contract.hasMany(User)



module.exports = LeaveTypeModel