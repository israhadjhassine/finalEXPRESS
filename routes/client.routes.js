const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientController');

const {authenticateToken,isClient} = require('../middlewares/auth.middleware');


router.get('/client', 
  (req, res, next) => {
    console.log('--- Accès à /products/client ---');
    console.log('Utilisateur:', req.user?.username);
    console.log('Rôle:', req.user?.role);
    next();
  },
  authenticateToken,
  isClient,
  controller.getAllProducts
);

router.post('/client',authenticateToken, isClient, controller.updateProfil);

module.exports = router;