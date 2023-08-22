const db = require('../database')
const Sequelize = require('sequelize')


const CandidateModel = db.define('Candidate', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: "This Name already Exists"
        }
    },
    qualification: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    yearsOfExperience: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    organizationWorkedBefore: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    vacancy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('rejected', 'shortlisted', 'selected', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
    }



}, {
    timestamps: false
})




module.exports = CandidateModel