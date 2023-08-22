require('dotenv').config()
const db = require('../database')
const Sequelize = require('sequelize')
const joi = require('joi')
let moment = require('moment')
const Employee = db.define('Employee', {
    id: {
        type: Sequelize.UUID,

        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "This email is already used"
        },


    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,

    },
    area: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    hiredDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.NOW
            // unique: false,

    },
    ssn: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    passportNo: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    contactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
        unique: false,

    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        // unique: false,
        defaultValue: Sequelize.NOW

    },
    postCode: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: false,

    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.DEFAULT_PROFILE_IMG


    },

})

function validate(employee) {
    const schema = {
        name: joi.string().min(5).max(15).required(),
        email: joi.string().email().min(5).max(15).required(),
        phone: joi.string().min(5).max(15).required(),
        status: joi.string().required(),

    }
    joi.validate(employee, schema)

}



module.exports.employeeModel = Employee
module.exports.validate = validate