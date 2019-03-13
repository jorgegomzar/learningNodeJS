const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// WELCOME
router.get('/', (req, res) => {
  res.render('welcome', {
    title: 'Bienvenid@'
  });
});
// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user
  });
});

module.exports = router;
