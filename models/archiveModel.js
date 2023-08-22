const db = require('../database')
const Sequelize = require('sequelize')


const Archive = db.define('Archive', {
    id: {
        type: Sequelize.INTEGER,
        // defaultValue: Sequelize.UUIDV4,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false
    },
    filename: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            args:true,
            msg:"File with This name already exists"
        },
    },
    fileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            let color = "#" + randomColor;
            return color
        }
    }, 
    bcolor: {
        type: Sequelize.STRING,
        defaultValue: () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            let color = "#" + randomColor;
            return color
        }
    }, 




}, {
    timestamps: false
})




module.exports = Archive