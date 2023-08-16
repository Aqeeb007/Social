const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token.trim();

    if (!token) {
        return res.status(400).json("Please login to continue");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to authenticate", error: err });
        }
        req.user = decoded;
        next();
    });
}