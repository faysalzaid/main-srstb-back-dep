const db = require('../database')
const Sequelize = require('sequelize')


const BlogModel = db.define('Blog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    description: {
        type: Sequelize.TEXT,
        allowNull: false,

    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW

    },

    user: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    trending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0

    },






}, {
    timestamps: true
})

// contract.hasMany(User)



module.exports = BlogModel