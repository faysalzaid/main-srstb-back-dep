const db = require('../database')
const Sequelize = require('sequelize')


const BudetTrackModel = db.define('projectReport', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    file: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    approvedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "None"
    },
    approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }






}, {
    timestamps: true,
    defaultScope: {
        order: [
            ['createdAt', 'ASC']
        ]
    }
})




module.exports = BudetTrackModel