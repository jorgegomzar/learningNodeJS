const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const LISTEN_PORT = 3000;
const app = express();

// PRE-CONFIG
// passport config
require('./config/passport')(passport);
// MongoDB config
const db = require('./config/keys').MongoURI;
// MongoDB connect
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

// MIDDLEWARE
// morgan
app.use(morgan('dev'));
// session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// layouts
app.use(expressLayouts);
// passport
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// VIEWS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.get('*', ensureAuthenticated, (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Pagina no encontrada');
});

app.listen(LISTEN_PORT, () => {
  console.log('Servidor funcionando en el puerto', LISTEN_PORT);
});
