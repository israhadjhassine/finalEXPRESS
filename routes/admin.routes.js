const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, isAdmin, adminController.adminDashboard);

router.post('/:id', authenticateToken, isAdmin, adminController.deleteGestionnaire);

module.exports = router;
