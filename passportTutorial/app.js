const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.get('*', ensureAuthenticated, (req, res) => {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Error 404. Page not found.');
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
