// Create database connection
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Config', 'SqlGui', '5041', {
    Host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: './Config.sqlite',
    logging:true
});

module.exports= sequelize

