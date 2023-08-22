const db = require('../database')
const Sequelize = require('sequelize')


const BlogCategoryModel = db.define('BlogCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,

    },





}, {
    timestamps: true
})

// contract.hasMany(User)



module.exports = BlogCategoryModel