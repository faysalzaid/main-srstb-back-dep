const db = require('../database')
const Sequelize = require('sequelize')


const BudetTrackModel = db.define('bugetTrack', {
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
    utilized: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    invoiced: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }



}, {
    timestamps: true
})




module.exports = BudetTrackModel