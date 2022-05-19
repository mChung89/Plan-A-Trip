const jwt = require("jsonwebtoken");

//Middleware Function
module.exports = function(req, res, next) {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).send("Acesss Denied");
  }

  const token = authHeader.split(' ')[1]     // Token is in the 1 position

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}
