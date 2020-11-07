const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    console.log("IN AUTH");
    try {
        const token = req.headers.authorization.split(' ')[1]; //on récupère le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY'); // on vérifie que le token a bien été créé à partir de la clée secrete

        if (decodedToken) { //si le token est valide, on passe au middleware suivant
            next();
        } else {
            throw new Error('Pas de token'); //sinon on créer une erreur
        }

    } catch (err) {
        res.status(401).json({ //on renvoie un objet avec la clés error et la valeur err.message qui correspond à une erreur 401
            error: err.message
        });
    }
};