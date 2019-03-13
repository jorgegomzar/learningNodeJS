var express = require('express');
var router = express.Router();

var landing = require('../controllers/landing');


/* GET home page. */
router.get('/', landing.get_landing);
router.get('/login', landing.login);
router.post('/login', landing.submit_lead);

router.get('*', (req, res)=>{
  res.end("Archivo no encontrado");
});
module.exports = router;
