const db = require('../database')
const Sequelize = require('sequelize')


const attachmentModel = db.define('Attachment', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    attach: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

            notEmpty: {
                args: true,
                msg: "file is required"
            }
        }
    },

    name: {
        type: Sequelize.STRING,
        validate: {

            notEmpty: {
                args: true,
                msg: "Error with File"
            }
        }
    },

    fileType: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "File Type Not Supported"
            }
        }


    }

}, {
    timestamps: false
})

// contract.hasMany(User)



module.exports = attachmentModel