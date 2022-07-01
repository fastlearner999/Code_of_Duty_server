const jwt = require('jsonwebtoken');
module.exports.verifyTokenFromClient = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.SECERT, async (err, data) => {
            if (err) {
                res.status(403).json({err: "Token verification fail"});
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({err: "Missing token"});
    }
};