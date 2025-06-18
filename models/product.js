module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    type: {
      type: DataTypes.ENUM('cheveux', 'visage', 'corps', 'main'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  });

  Product.associate = models => {
  Product.belongsTo(models.User, {
    foreignKey: 'gestionnaireId',
    as: 'gestionnaire',  // Alias
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  });
};

  return Product;
};
