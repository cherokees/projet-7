const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY'); // Clé de crytage du tokken pour décodage
        console.log(decodedToken)

        if (decodedToken) {
            next();
        } else {
            throw 'Pas de token'
        }

    } catch (err) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
    // try { // essai des instruction suivante
    //     const token = req.headers.authorization.split(' ')[1]; // recupération du token ([0]Bearer / [1]token en fonction du USerID)
    //     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY'); // Clé de crytage du tokken pour décodage
    //     const id = decodedToken.userId; //mise en memoire du token decryté
    //     if (req.params.id && parseInt(req.params.id) !== id) { // vérification du tokken 
    //         throw 'Invalid user ID'; // mauvais token
    //     } else {
    //         next(); // bon token on passe a la suite
    //     }
    // } catch (err) { // si erreur dans les inscrutions du try
    //     res.status(401).json({
    //         error: new Error('Invalid request!')
    //     });
    // }
};