const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

mongoose.connect(keys.mongoUri)
require("./models/User")

const app = express()
require('./services/passport')

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    secure: false
}))

app.use(passport.initialize())
app.use(passport.session())
require('./routes/authRoutes')(app)

app.listen(process.env.PORT || 5000, () => console.log("listening..."))