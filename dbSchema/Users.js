var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;

var userSchema = new schema({
    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.methods.hashPassword = function (plaintextPassword) {
    return bcrypt.hashSync(plaintextPassword,bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (plaintextPassword,hash) {
    return bcrypt.compareSync(plaintextPassword,hash)
}

module.exports = mongoose.model('usersD',userSchema,'usersD');