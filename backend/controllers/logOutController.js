const User = require("../model/User");


const handleLogout = async (req, res) => {
    // On client make sure to delete accessToken
    const cookies = req.cookies;
    if (!cookies?.["auth-jwt"]) return res.sendStatus(204);  //Successful. No content to send back

    const refreshToken = cookies["auth-jwt"]

    // Look for refreshToken in DB
    const foundUser = await User.findOne({refreshToken: refreshToken})

    if(!foundUser) {
        res.clearCookie('auth-jwt', { httpOnly: true });
        return res.sendStatus(204)
    }
    console.log(foundUser)

    //RefreshToken was found now need to delete in db
    const deleteTokenFromUser = await User.findByIdAndUpdate(foundUser._id, { $unset: {accessToken: ""}})
    console.log(deleteTokenFromUser)
    res.clearCookie('auth-jwt', { httpOnly: true })  // secure: true  IN PRODUCTION
    res.sendStatus(204)
};

module.exports = { handleLogout }
