const db = require('../database')
const Sequelize = require('sequelize')


const agreement = db.define('agreement', {
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


}, {
    timestamps: false
})

// contract.hasMany(User)



module.exports = agreement