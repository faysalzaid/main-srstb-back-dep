const db = require('../database')
const Sequelize = require('sequelize')


const Roads = db.define('road', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    destination: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pavementType: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    maintained: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    condition: {
        type: Sequelize.ENUM('poor','fair','good','verygood'),
        allowNull: false,
    },
    length: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    width: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    design: {
        type: Sequelize.STRING,
        allowNull: true,
    },







}, {
    timestamps: false
})




module.exports = Roads