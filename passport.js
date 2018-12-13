var localStrategy = require('passport-local').Strategy;
var User = require('./dbSchema/Users')


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })
    passport.use(new localStrategy(function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                done(err)
            } else {
                if (user) {
                    var valid = user.comparePassword(password, user.password)
                    if (valid) {
                        done(null, {
                            email: user.email,
                        })
                    } else {
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
}