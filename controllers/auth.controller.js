const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.User;
const SECRET = 'jwt-secret-key'; // clé secrète mta3 JWT


// formulaire login (page s'affiche, pas de traitement ici)
exports.loginForm = (req, res) => {
  res.render('login', { error: null });
};

// traitement login utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    // ken l’email ma fama7ad bih
    if (!user) {
      return res.render('login', { error: 'Utilisateur non trouvé.' });
    }

    const valid = await bcrypt.compare(password, user.password);

     // mot de passe ghalet
    if (!valid) {
      return res.render('login', { error: 'Mot de passe incorrect.' });
    }

    // génération token JWT mta3 l'utilisateur
    const token = jwt.sign(
      { id: user.id, 
        username: user.username, 
        email: user.email,
        brandName: user.brandName,
        createdAt: user.createdAt,
        password: user.password,
     role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    const userId = user.id;

    // stockage token dans cookie
    res.cookie('token', token);

     // redirection selon rôle utilisateur
    if (user.role === 'gestionnaire') {
      return res.redirect(`/products/my-products?userId=${userId}`); 
    } else if (user.role === 'admin') {
      return res.redirect(`/products/admin?userId=${userId}`); 
    } else {
      return res.redirect(`/products/client?userId=${userId}`); 
    }


  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Erreur serveur.' });
  }
};

// affichage formulaire inscription
exports.registerForm = (req, res) => {
  res.render('register', { error: null });
};

// traitement inscription utilisateur
exports.registerUser = async (req, res) => {
  const { username, email, password, isManager, brandName } = req.body;

  try {

     // crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // création user jdid
    await User.create({
  
      username,
      email,
      password: hashedPassword,
      role: isManager === 'on' ? 'gestionnaire' : 'client',
      brandName: isManager === 'on' ? brandName : null
    });


     // redirection vers login baad inscription
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Erreur lors de l’inscription.' });
  }
};
