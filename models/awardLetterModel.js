const db = require('../database')
const Sequelize = require('sequelize')


const AwardLetter = db.define('Award', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    file: {
        type: Sequelize.STRING,
        allowNull: false
    }




}, {
    timestamps: true
})




module.exports = AwardLetter