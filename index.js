const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')

mongoose.connect(keys.mongoUri)
require("./models/User")

const app = express()

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    secure: false
}))
require('./services/passport')

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, rsp) => rsp.sendFile(path.resolve(__dirname, 'client/build','index.html')))
}

app.listen(process.env.PORT || 5000, () => console.log("listening..."))