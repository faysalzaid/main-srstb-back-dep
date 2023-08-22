const db = require('../database')
const Sequelize = require('sequelize')


const LetterRequest = db.define('letterRequest', {
    id: {
        type: Sequelize.INTEGER,
        // defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
    },
    letter: {
        type: Sequelize.TEXT,
        allowNull: false,
    },


})

// contract.hasMany(User)



module.exports = LetterRequest