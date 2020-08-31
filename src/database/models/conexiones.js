const Sequelize = require('sequelize');
const sequelize = require('../database');

const Consultas= sequelize.define('tblconexiones',{
    CONEXION_ID:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    HOST:{
        type:Sequelize.STRING(250),
        defaultValue: "localhost"
    },
    USER:{
        type:Sequelize.STRING(250),
        defaultValue: "root"
    },
    PASSWORD:{
        type:Sequelize.STRING(250),
    },
    PORT:{
        type:Sequelize.INTEGER,
        defaultValue: 3306   
    },
    DATABASE:{
        type:Sequelize.STRING(250)     
    }
},{
    timestamps: false
});


module.exports = Consultas