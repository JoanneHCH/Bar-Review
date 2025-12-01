// Load packages and environment variables
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Mongo error:', err));

// Set EJS view engine + Layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // views/layout.ejs is the global template


// Global variables (Google Maps Key)
app.locals.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Middleware setup 
  
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // Support PUT / DELETE in HTML forms
app.use(express.static(path.join(__dirname, 'public'))); // Static files (CSS / JS / images)

app.use(session({ // Session configuration (used for login sessions)
  secret: 'secret',           
  resave: false,
  saveUninitialized: false
}));

const passportConfig = require('./config/passport'); // Passport initialization
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => { // Global variable — `user` available in all EJS templates
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => { // Debug logging
  console.log(`👉 Received: ${req.method} ${req.url}`);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const barRoutes = require('./routes/bars');
const reviewRoutes = require('./routes/reviews');

app.use('/', authRoutes);
app.use('/bars', barRoutes);
app.use('/bars/:id/reviews', reviewRoutes);

// Homepage
app.get('/', (req, res) => {
  res.render('home'); // home.ejs will automatically use layout.ejs
});

// 404 Error handler (page not found)
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});