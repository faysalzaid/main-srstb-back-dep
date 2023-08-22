const db = require('../database')
const Sequelize = require('sequelize')


const SlipPaper = db.define('SlipPaper', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    to: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
    },




}, {
    timestamps: false
})

// SlipPaper.hasMany(User)



module.exports = SlipPaper