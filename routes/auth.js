var express = require('express');
var router = express.Router();
var User = require('../dbSchema/Users');



/* GET home page. */

module.exports = function (passport) {
    router.post('/signup', function (req, res) {
        req.check('username', 'user name can only contain letters or numbers').isAlphanumeric().notEmpty();
        req.check('email', 'email cannot be blank').notEmpty()
        req.check('email', 'Not an Email').isEmail();
        req.check('password','Password does not match criteria').isLength(8).isAlphanumeric().notEmpty();
        var errors = req.validationErrors();
        if(errors){
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/signup')
        } else {
            req.session.success = true;

            var body = req.body,
                username = body.username,
                email = body.email,
                password = body.password;
            User.findOne({
                email: email,
            }, function (err, doc) {
                if (err) {
                    res.status(500).send('error')
                } else {
                    if (doc) {
                        req.session.invemail = 'email already exists'
                        console.log('1' + req.session.invemail);
                        res.redirect('/signup')
                    } else {
                        var record = new User()
                        record.username = username;
                        record.email = email;
                        record.password = record.hashPassword(password)
                        record.save(function (err, user) {
                            if (err) {
                                res.status(500).send('db error')
                            } else {
                                res.redirect('/login')
                            }
                        })
                    }
                }
            })
        }
    });


    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
    }), function (req, res) {
        res.send('err')
    })
    return router;
};