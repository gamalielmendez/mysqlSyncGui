const conexiones = require('./models/conexiones')
const sequelize = require('./database')

module.exports= async () => {
    await sequelize.sync();
}


