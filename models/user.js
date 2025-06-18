module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'gestionnaire'),
      allowNull: false,
      defaultValue: 'client'
    },

    brandName: {
  type: DataTypes.STRING,
  allowNull: true // seulement pour les gestionnaires
}

  });

 

  return User;
};
