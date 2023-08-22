const db = require('../database')
const Sequelize = require('sequelize')


const Area = db.define('Area', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,

        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "This Area Name Has Already Been Registered"
        }
    },



}, {
    timestamps: false
})




module.exports = Area