const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
    app.get('/auth/google/callback', passport.authenticate('google'))
    app.get('/auth/logout', (req, rsp) => {
        console.log(req.user)
        req.logout()
        rsp.send(req.user)
    })
    app.get('/api/current_user', (req, rsp) => rsp.send(req.session))
}