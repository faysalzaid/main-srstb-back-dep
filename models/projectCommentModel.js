const db = require('../database')
const Sequelize = require('sequelize')


const PcommentModel = db.define('Pcomment', {
    id: {
        type: Sequelize.INTEGER,
        // defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    approved: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },



}, {
    timestamps: false
})

// PcommentModel.hasMany(User)



module.exports = PcommentModel