const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)))

const userHandler = async (accessToken, refreshToken, { id }, done) => { 
    const user = await User.findOne({googleId: id})

    if (!user) {
        user = await (new User({ googleId: id })).save() 
    }

    return done(null, user)
}

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, userHandler))