const jwt = require('jsonwebtoken');
const SECRET = 'jwt-secret-key'; 

module.exports = {

  // vérifie si l’utilisateur est connecté w 3ando token
  authenticateToken: (req, res, next) => {// nécessite l’utilisation de cookie-parser
     const token = req.cookies?.token;
    if (!token) {

      return res.status(401).json({ message: 'Token missing' });
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded; // on garde les infos utilisateur fi req.user
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

   // autorisation client uniquement
  isClient: (req, res, next) => {
    if (req.user?.role === 'client') return next();
    res.status(403).render('error', { message: 'Accès réservé aux clients' });
  },

  // autorisation admin uniquement
  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
  },

  // autorisation gestionnaire uniquement
  isGestionnaire: (req, res, next) => {
    if (req.user && req.user.role === 'gestionnaire') {
      return next();
    }
    return res.status(403).json({ message: 'Gestionnaire access required' });
  }

  
};