var passport = require('passport')
var User = require('../models/schema')
const bcrypt = require('bcrypt')
function init(passport)
{
  var  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'pwd'
},

function(email,pwd, done) {
  User.findOne({ email:email }, function (err ,user) {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, { 'error': 'Incorrect username.' });
    }

    if (!user.validate(pwd)) {
      return done(null, false, {  'error': 'Incorrect password.' });
    }
    return done(null, user,{  'error': 'success' });
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});}


  module.exports  = init