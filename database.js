const Sequelize = require("sequelize")
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql'
})


sequelize.authenticate()
    .then((err) => {
        if (err) {
            console.log(err);
        }
        console.log('DB connection Successfull');
    })

module.exports = sequelize