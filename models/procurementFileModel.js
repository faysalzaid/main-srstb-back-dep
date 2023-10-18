const db = require('../database')
const Sequelize = require('sequelize')


const Procurements = db.define('procurement', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    file: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },






}, {
    timestamps: true
})




module.exports = Procurements