 const db = require('../database')
 const Sequelize = require('sequelize')


 const SettingModel = db.define('Setting', {
     id: {
         type: Sequelize.INTEGER,
         // defaultValue: Sequelize.UUIDV4,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
     },
     logo: {
         type: Sequelize.STRING,
         allowNull: false,
     },
     name: {
         type: Sequelize.STRING,
         allowNull: false,
     },
     address1: {
         type: Sequelize.TEXT,
         allowNull: false,
     },
     address2: {
         type: Sequelize.TEXT,
         allowNull: false,
     },

     loginlogo: {
         type: Sequelize.STRING,
         allowNull: false,
     },




 }, {
     timestamps: false
 })

 // SettingModel.hasMany(User)



 module.exports = SettingModel