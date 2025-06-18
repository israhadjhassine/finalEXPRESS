const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cosmetics_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});

module.exports = sequelize;
