const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const User = require('../models/User')
var requireLogin = require('../middlewares/requireLogin')

module.exports = app => {

  app.post("/api/stripe", requireLogin, async(req, rsp) => {

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Credit for Emaily',
      source: req.body.id
    })

    req.user.credits += 5
    const user = await req.user.save()

    rsp.send(user)
  })

}