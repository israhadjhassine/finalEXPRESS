// product.controller.js
const { Product, User } = require('../models'); // Importez à la fois Product et User
const bcrypt = require('bcrypt');



// traitement mta3 l’ajout d’un produit
exports.createProduct = async (req, res) => {
  const { name, description, type, quantity, price, image } = req.body; // Ajoutez image
  try {
    await Product.create({
      name,
      description,
      type,
      quantity,
      price,
      image, 
      gestionnaireId: req.user.id // produit mta3 gestionnaire connecté
    });
    res.redirect('/products/my-products'); // redirection vers produits mta3 gestionnaire
  } catch (err) {
    console.error(err);
    res.render('products/create', { error: 'Erreur lors de la création du produit.' });
  }
};

// afficher les produits du gestionnaire connecté w regroupés par type
exports.getOwnProductsGrouped = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { gestionnaireId: req.user.id }
    });

    const grouped = {
      cheveux: [],
      visage: [],
      corps: [],
      main: []
    };

    // regroupement 7asab type
    products.forEach(p => {
      if (grouped[p.type]) {
        grouped[p.type].push(p);
      } else {
        grouped.autre = grouped.autre || [];
        grouped.autre.push(p);
      }
    });

     // affichage page mta3 mes produits
    res.render('products/my-products', { 
      grouped,
      user: {
        id: req.user.id,
        username: req.user.username, 
        email: req.user.email
      },
      error: null 
    });
  
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};



// traitement modification produit
exports.updateProduct = async (req, res) => {
  const { name, description, type, quantity, price, image } = req.body;
  try {
    const updateData = { 
      name, 
      description, 
      type, 
      quantity, 
      price,
      image 
    };

    const [updated] = await Product.update(
      updateData,
      { where: { id: req.params.id, gestionnaireId: req.user.id } }
    );

    if (updated === 0) {
      return res.status(404).send('Produit introuvable ou non autorisé');
    }

    res.redirect('/products/my-products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// suppression produit
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id, gestionnaireId: req.user.id }
    });

    if (deleted === 0) {
      return res.status(404).send('Produit introuvable ou non autorisé');
    }

    res.redirect('/products/my-products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// modification profil utilisateur (gestionnaire)
exports.updateProfil = async (req, res) => {
  const { username, email, currentPassword, newPassword, confirmPassword } = req.body;
  
  try {
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    const updateData = {};
    
    if (username && username !== user.username) {
      updateData.username = username;
    }
    
    if (email && email !== user.email) {
      updateData.email = email;
    }

    if (currentPassword && newPassword && confirmPassword) {
      
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send('Mot de passe actuel incorrect');
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).send('Les nouveaux mots de passe ne correspondent pas');
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length > 0) {
      await user.update(updateData);
    }

    res.redirect('/products/my-products');
    
  } catch (err) {
    console.error(err);
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Cet email ou nom d\'utilisateur est déjà utilisé');
    }
    
    res.status(500).send('Erreur serveur');
  }
};