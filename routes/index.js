var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

//adminpage3
router.get('/users/admin3',function(req, res){
  res.render('adminpage3',{})
});

//homepage
router.get('/', function(req, res, next) {
  res.render('homepage', {});
});

module.exports = router;
