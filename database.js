const Sequelize = require("sequelize")
require('dotenv').config()

const sequelize = new Sequelize('projectm', "faysalzaid", "Cooler@1997", {
    host:"127.0.0.1",
    dialect: 'mysql',
})


sequelize.authenticate()
    .then((err) => {
        if (err) {
            console.log(err);
        }
        console.log('DB connection Successfull');
    })

module.exports = sequelize
