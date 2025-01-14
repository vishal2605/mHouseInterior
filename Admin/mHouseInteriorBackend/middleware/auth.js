const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Corrected from sendStatus to res.sendStatus
            }
            req.user = user; // Attach the user object to the request
            next();
        });
    } else {
        res.sendStatus(401); // No authorization header
    }
};

module.exports = {
    authenticateJwt
};
