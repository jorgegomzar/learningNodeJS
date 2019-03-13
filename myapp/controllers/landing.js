exports.get_landing = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.login = function(req, res, next) {
  res.render('login', { title: 'Express' });
}

exports.submit_lead = function(req, res, next) {
  console.log("Load email:", req.body.lead_email);
  res.redirect('/');
}
