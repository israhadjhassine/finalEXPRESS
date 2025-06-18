const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHomePage);
router.post('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Beauty Glow Pro - Votre routine beauté'
    });
});

module.exports = router;