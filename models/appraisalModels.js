const db = require('../database')
const Sequelize = require('sequelize')


const appraisal = db.define('appraisal', {
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
    timestamps: true
})

// contract.hasMany(User)



module.exports = appraisal