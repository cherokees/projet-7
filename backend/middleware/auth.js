const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    console.log("IN AUTH");
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY'); // Clé de crytage du tokken pour décodage

        if (decodedToken) {
            next();
        } else {
            throw new Error('Pas de token');
        }

    } catch (err) {
        res.status(401).json({
            error: err.message
        });
    }
};