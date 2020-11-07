const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


    console.log("IN AUTHID");


    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, 'RANDOM_TOKEN_KEY'); // Clé de crytage du tokken pour décodage
        console.log(decodedToken.userId, req.params.id, decodedToken.userId === req.params.id);

        // decodedToken.userId
        // req.params.id
        if (decodedToken.userId === parseInt(req.params.id, 10)) { //on compare l'id du token avec celui de l'url
            next();
        } else {
            throw new Error('Erreur d\'accès')
        }

    } catch (err) {
        res.status(403).json({
            message: err.message
        });
    }
};