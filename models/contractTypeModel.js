const db = require('../database')
const Sequelize = require('sequelize')


const contractType = db.define('ContractType', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Type must be unique"
        },
        validate: {

            notEmpty: {
                args: true,
                msg: "Type is required"
            }
        }
    },

}, {
    timestamps: false
})

// contract.hasMany(User)



module.exports = contractType