exports.getHomePage = (req, res) => {
    res.render('home', {
        pageTitle: 'Beauty Glow Pro - Votre routine beauté'
    });
};