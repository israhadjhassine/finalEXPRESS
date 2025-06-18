const { Sequelize, DataTypes } = require('sequelize'); // On importe Sequelize w DataTypes bech najmou nesta3emlou les types kima string , integer ...
const sequelize = require('../config/db'); 

const db = {}; // On crée un objet vide pour regrouper tous les modèles mte3na

// On met Sequelize (la classe) et sequelize (l'instance connectée) dans l’objet db
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.User = require('./user')(sequelize, DataTypes); 
db.Product = require('./product')(sequelize, DataTypes); 

db.Product.associate(db); // Ici, on lance les associations (liens entre les tables) définies dans le modèle Product

module.exports = db; // On exporte tous les modèles et la connexion Sequelize pour l’utiliser dans les controllers
