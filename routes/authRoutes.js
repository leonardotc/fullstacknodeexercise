const passport = require('passport')

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback', 
    passport.authenticate('google'),
    (req, rsp) => rsp.redirect("/surveys")
  )

  app.get('/api/logout', (req, rsp) => {
    req.session = null
    rsp.redirect("/")
  })

  app.get('/api/current_user', (req, rsp) => { 
    rsp.send(req.user)
  })
}