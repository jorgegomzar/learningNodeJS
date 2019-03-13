const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User models
const User = require('../models/User');
// LOGIN
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});
// LOGIN HANDLER
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// REGISTER
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registro'
  });
});
// REGISTER HANDLER
router.post('/register', (req, res) => {
  const {name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Por favor, rellena todos los campos' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Las contraseñas no coinciden' });
  }
  if (password.length < 6) {
    errors.push('La contraseña debe tener 6 carácteres como mínimo');
  }
  if (errors.length > 0) {
    res.render('register', {
      title: 'Registro',
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validación
    User.findOne({email: email})
      .then(user => {
        if (user) {
          // Existe ya el correo en la DB
          errors.push({ msg: 'Ese correo ya está en uso' });
          res.render('register', {
            title: 'Registro',
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          // Hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err; }
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'Has sido registrado con éxito. Inicia sesión')
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          }));
        }
      })
      .catch(err => console.log(err));
  }
});

// LOGOUT HANDLER
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Se ha cerrado la sesión');
  res.redirect('/users/login');
});

module.exports = router;
