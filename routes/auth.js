const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Registration page
router.get('/register', (req, res) => {
  res.render('auth/register'); 
});

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.send('⚠️ 此 Email 已被註冊');
  const user = new User({ username, password });
  await user.save();
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Local login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/bars',
    failureRedirect: '/login'
  })
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/bars')
);

// Facebook login
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/bars')
);

module.exports = router;