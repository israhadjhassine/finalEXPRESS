const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.loginForm);
router.post('/login', authController.loginUser);


router.get('/register', authController.registerForm);
router.post('/register', authController.registerUser);


module.exports = router;
