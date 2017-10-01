module.exports = (req, rsp, next) => {

  if (!req.user){
    return rsp.status(401).send({ error: "log in first" })
  }

  next()
}