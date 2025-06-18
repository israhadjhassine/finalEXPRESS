const { Product, User } = require('../models');
const bcrypt = require('bcrypt');


// affichage mta3 les produits (clients ychoufouhom)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: User,
        as: 'gestionnaire', // nafs l’alias li 3ayt bih f l’association
        attributes: ['username', 'brandName'],
        required: false
      }]
    });

     // regrouper les produits par type
    const grouped = {
      cheveux: [],
      visage: [],
      corps: [],
      main: [],
      autre: []
    };

    // parcourir les produits w na7touhom fi groupe mta3hom
    products.forEach(product => {
      const type = grouped[product.type] ? product.type : 'autre';
      grouped[type].push({
        ...product.get({ plain: true }),
        User: product.gestionnaire // Utilisez l'alias ici
      });
    });

    // affichage de la page client m3a produits regroupés
    res.render('products/client', {
      grouped,
      user: req.user,
      error: null
    });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).render('products/client', {
      grouped: {},
      user: req.user,
      error: 'Erreur de chargement des produits'
    });
  }
};

// modification profil utilisateur
exports.updateProfil = async (req, res) => {
  const { username, email, currentPassword, newPassword, confirmPassword } = req.body;
  
  try {
    // chercher l'utilisateur connecté
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

   
    const updateData = {};
    
    // modifier username si y7eb ybaddlou
    if (username && username !== user.username) {
      updateData.username = username;
    }
    
    // modifier email si changed
    if (email && email !== user.email) {
      updateData.email = email;
    }

    // traitement mot de passe si les 3 champs sont remplis
    if (currentPassword && newPassword && confirmPassword) {
      // Vérifier l'ancien mot de passe
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send('Mot de passe actuel incorrect');
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).send('Les nouveaux mots de passe ne correspondent pas');
      }

       // crypter le nouveau mot de passe
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // appliquer les changements si y a au moins un champ modifi
    if (Object.keys(updateData).length > 0) {
      await user.update(updateData);
    }

    // redirection vers page client 
    res.redirect('/products/client');
    
  } catch (err) {
    console.error(err);
    
    // si l'email ou username déjà utilisé
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Cet email ou nom d\'utilisateur est déjà utilisé');
    }
    
    res.status(500).send('Erreur serveur');
  }
};