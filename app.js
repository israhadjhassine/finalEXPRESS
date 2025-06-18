

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./models');

const app = express();

// Middleware cookie-parser doit être avant tout middleware qui utilise les cookies
app.use(cookieParser());

// Middlewares pour parser le body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use('/css', express.static(path.join(__dirname, 'views/css')));

// Routes home
const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);


// Routes publiques (authentification)
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// Middleware d’authentification JWT à placer ici les routes l be9iin lezem ykounou protégé
const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware.authenticateToken); // applique à toutes les routes suivantes

// Routes protégées (ex: produits)
const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);


// Routes Client
const client = require('./routes/client.routes');
app.use('/products', client);

const admin = require('./routes/admin.routes');
app.use('/products/admin', admin);


// Synchronisation de la base de données (sans "force: true" pour ne pas perdre les données)
db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});