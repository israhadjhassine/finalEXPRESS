const db = require('../models');
const User = db.User;


// houni l'adminDashboard ychouf liste mta3 gestionnaires
exports.adminDashboard = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.redirect('/auth/login'); 
    }

    // yjib les users eli role mta3hom "gestionnaire"
    const gestionnaires = await User.findAll({
      where: { role: 'gestionnaire' },
      attributes: ['id', 'username', 'email', 'brandName', 'createdAt'],
      order: [['createdAt', 'DESC']] 
    });

    // yab3ath page admin m3a les données li jabhom
    res.render('products/admin', {
      title: 'Admin Dashboard',
      user: req.user,
      gestionnaires,
      message: req.query.message || null,
      error: req.query.error || null
    });
  } catch (err) {

    // ken fama erreur f le code, yab3ath error msg
    console.error('Erreur dashboard admin:', err);
    res.redirect('/products/admin?error=' + encodeURIComponent('Erreur serveur lors du chargement'));
  }
};

// houni fonction bach l'admin ynajjem yfasakh gestionnaire
exports.deleteGestionnaire = async (req, res) => {
  try {
    const gestionnaire = await User.findOne({
      where: {
        id: req.params.id, // ychouf l’id mta3 gestionnaire
        role: 'gestionnaire' // yet2aked li role mta3ou correct

      }
    });

    if (!gestionnaire) {
      return res.redirect('/products/admin?error=' + encodeURIComponent('Gestionnaire introuvable'));
    }

     // ken fama gestionnaire ifasakhou 
    await gestionnaire.destroy();

    res.redirect('/products/admin?message=' + encodeURIComponent('Gestionnaire supprimé avec succès'));
  } catch (err) {
    console.error('Erreur suppression gestionnaire:', err);
    res.redirect('/products/admin?error=' + encodeURIComponent('Erreur lors de la suppression'));
  }
};

