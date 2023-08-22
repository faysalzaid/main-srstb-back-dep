const db = require('../database')
const Sequelize = require('sequelize')


const medicalAllowance = db.define('medical_allowance', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },


    file: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "file is required"
            }
        }
    },


})

// contract.hasMany(User)



module.exports = medicalAllowance