const db = require('../database')
const Sequelize = require('sequelize')
const { User } = require('./usersModel')


const Bid = db.define('Bid', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: "This name is already used"
        },
    },
    score: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING
    },
    license: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM("approved", "rejected", "processing"),
        allowNull: false,
        defaultValue: "processing",
    },
    evaluationStatus: {
        type: Sequelize.ENUM("YES", "NO"),
        allowNull: false,
        defaultValue: "NO",
    },
    evaluationFile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    bidUserPic: {
        type: Sequelize.STRING,
        allowNull: true
    },
    performa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    proposal: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
    },
    companydoc: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    selected: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

})



module.exports = Bid