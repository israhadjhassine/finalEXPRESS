const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const {authenticateToken,isGestionnaire } = require('../middlewares/auth.middleware');

router.post('/',authenticateToken, isGestionnaire, controller.createProduct);
router.get('/my-products',authenticateToken, isGestionnaire, controller.getOwnProductsGrouped);
router.post('/my-products',authenticateToken, isGestionnaire, controller.updateProfil);
router.post('/create',authenticateToken, isGestionnaire, controller.createProduct);
router.post('/edit/:id',authenticateToken, isGestionnaire, controller.updateProduct);
router.post('/delete/:id',authenticateToken, isGestionnaire, controller.deleteProduct);

module.exports = router;
