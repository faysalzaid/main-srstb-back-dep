const db = require('../database')
const Sequelize = require('sequelize')


const Members = db.define('members', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    position: {
        type: Sequelize.STRING,
        allowNull:false
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }





}, {
    timestamps: false
})




module.exports = Members