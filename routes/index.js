var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


router.get('/login', function (req, res, next) {
    res.render('login');
});





router.get('/signup', function(req, res, next) {
    res.render('signup', { success: false, errors: req.session.errors, invemail: req.session.invemail });
    req.session.error=null;
    req.session.invemail=null;
});

module.exports = router;