const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    'miprimerapi':'Works!'
  });
});

module.exports = router;
