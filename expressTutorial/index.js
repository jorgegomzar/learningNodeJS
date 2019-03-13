var express = require('express');
var app = express();
var morgan = require('morgan');

const routes = require('./routes/index');
const routesAPI = require('./routes/api');

// settings
app.set('appName', 'My first server');
app.set('view-engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware
app.use(morgan('dev'));

// rutas
app.use(routes);
app.use('/api', routesAPI);
app.get('*', (req, res) => {
  res.writeHead(404, {'Content-Type':'text/plain'});
  res.end('File not found');
});

app.listen(3000, () => {
  console.log('appName:', app.get('appName'));
  console.log('Server running...');
});
