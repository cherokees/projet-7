import express from 'express';
import { getAllUsers, addUser, getUserByEmail, getUserById } from '../control/users';
import { validateFieldsPOST, VLD_IS_EMAIL, VLD_NOT_EMPTY_STRING, VLD_NO_SPECIAL_CHARS } from '../utils/validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';

export const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const rows = await getAllUsers();
        res.status(200).json({ data: rows });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});

router.get("/profil/:id", async (req, res, next) => {
    try {
        // res.send('trololo')
        // console.log('trololo', req.params.id)
        // const rows = res.send(req.params);
        const result = await getUserById(req.params.id);
        console.log(result);
        res.status(200).json({ data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Internal error" });
    }
})

router.post("/auth", auth, async (req, res, next) => {
    try {
        res.status(200).json({ message: 'connecté' });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});

router.post("/signup",
    validateFieldsPOST({
        email: [VLD_IS_EMAIL],
        password: [VLD_NOT_EMPTY_STRING],
        firstName: [VLD_NOT_EMPTY_STRING],
        lastName: [VLD_NOT_EMPTY_STRING],
    }),

    // Vérification que l'email n'est pas déjà utilisé
    async (req, res, next) => {

        const isEmailUsed = await getUserByEmail(req.body.email, ['users_id']);

        if (isEmailUsed !== null) {
            res.status(400).json({ data: null, message: "Cet email est déjà utilisé" });
        } else {
            next();
        }
    },

    async (req, res, next) => {
        try {
            const result = await addUser(
                req.body.email,
                req.body.password,
                req.body.firstName,
                req.body.lastName,
            );
            res.status(200).json({ data: { id: result }, message: "Utilisateur créé" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    }
);

router.post("/login",
    validateFieldsPOST({
        email: [VLD_IS_EMAIL],
        password: [VLD_NOT_EMPTY_STRING],
    }),
    async (req, res, next) => {
        try {

            // vérif existence email, et récupération de l'id et du mdp

            const user = await getUserByEmail(req.body.email, ['users_id', 'users_password']);
            // console.log(user)

            if (user === null) { // si l'utilisateur n'éxiste pas on renvois un msg d'erreur
                res.status(400).json({ data: null, message: "l'email ou le mot de passe est érroné" });
            } else { //sinon on compare le hash du mdp envoyé avec celui enregistré
                const result = await bcrypt.compare(req.body.password, user.users_password);

                // si le mdp est valide
                if (result === true) {
                    res.status(200).json({
                        userId: user.users_id,
                        token: jwt.sign(
                            { userId: user.users_id },
                            'RANDOM_TOKEN_KEY',
                            { expiresIn: '24h' }
                        )
                    })

                    // si le mdp est invalide, on envoie un statut 400
                } else {
                    res.status(400).json({ data: null, message: "l'email ou le mot de passe est érroné" });
                }
            }

            //     .then(valid => {
            //         if (!valid) {
            //             return res.status(401).json({ error: 'Mot de passe incorrect !' });
            //         }
            //         res.status(200).json({
            //             userId: user._id,
            //             token: jwt.sign(            //utilisation de jsonWebToken
            //                 { userId: user._id },   //gestion du UserId
            //                 'RANDOM_TOKEN_KEY',     // clé de cryptage
            //                 { expiresIn: '24h' }    // temps de validité
            //             )
            //         });
            //     })
            // }
            // vérif mot de passe





            // const result = await getUserById(
            //     req.body.email,
            //     req.body.password,
            // );
            // res.status(200).json({ data: { id: result }, message: "Vous êtes connecté" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    }
);

