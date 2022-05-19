const jwt = require("jsonwebtoken");
const User = require("../model/User");


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.["auth-jwt"]) return res.sendStatus(401);
  res.clearCookie('auth-jwt', { httpOnly: true });

  const refreshToken = cookies["auth-jwt"]

  const foundUser = await User.findOne({refreshToken: refreshToken})
  // Detected refreshToken reuse!
  if(!foundUser) {
    jwt.verify(
      refreshToken, 
      process.env.REFRESH_TOKEN_SECRET,
      async (err,decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        const hackedUser = await User.findOne({ username: decoded.username }).exec();
        hackedUser.refreshToken = "";
        const result = await hackedUser.save();
      }
    )
  }

  // evaluate jwt
  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET,
    async (err,decoded) => {
      if (err || !decoded._id.includes(foundUser._id)) return res.sendStatus(403)
      const accessToken = jwt.sign(
        { time: Date(),
        _id : decoded._id,},
        process.env.TOKEN_SECRET,
        { expiresIn: '30m'}
      );
      const newRefreshToken = jwt.sign(
        {time: Date(), 
          _id: decoded._id}, process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d'}
          )
      const updateUserRefreshToken = await User.findOneAndUpdate({_id: decoded._id}, {$set: {refreshToken: newRefreshToken}})
          res.cookie('auth-jwt', newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
          let user = foundUser
          res.json({ user, accessToken })
    } )
};

module.exports = { handleRefreshToken }
