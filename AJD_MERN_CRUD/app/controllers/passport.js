const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/schema')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField:"email" }, async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email })
        if(!user ) {
            return done(null, false, { 'error': 'No user with this email' })
        }

        bcrypt.compare(password,user.pwd).then(match => {
            if(match) {
                return done(null, user, {'error':'Logged in succesfully' }) 
            }
            return done(null, false, { 'error':'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { 'error': 'Something went wrong' })
        })
    }))

    passport.serializeUser((user , done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (_id, done) => {
       try{
        const user =  await   User.findOne({_id })
        done(null,user)
       }catch (e){
           done(e)
       }
      
    })

    // function authenticationMiddleware () {
    //     return function (req, res, next) {
    //       if (req.isAuthenticated()) {
    //         return next()
    //       }
    //       res.redirect('/')
    //     }
    //   }
    passport.use('local', new LocalStrategy({
        usernameField:'email',
       /// passwordField: 'password',
        passReqToCallback: true
    }))

}

module.exports = init