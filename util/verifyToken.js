module.exports.verifyTokenFromClient = (req, res, next) => {
    const token = req.headers['Authorization'];
    if (token) {
        jwt.verify(token, process.env.SECERT, async (err, data) => {
            if (err) {
                res.status(403).json({err: "Missing token"});
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({err: "Missing token"});
    }
};