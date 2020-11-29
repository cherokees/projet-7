import express from 'express';
import { getAllUsers, addUser, getUserByEmail, getUserById, putUserById, disableUserById, getUserByName, getAllMessagesByUserId } from '../control/users';
import { validateFieldsPOST, VLD_IS_EMAIL, VLD_NOT_EMPTY_STRING, VLD_NO_SPECIAL_CHARS } from '../utils/validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
import authUserId from '../middleware/authUserId';
import { getAllMessages } from '../control/messages';
// import multer from "../middleware/multer";

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

router.get("/profil/:id", auth, authUserId, async (req, res, next) => {
    console.log(req.params.id);
    try {
        const result = await getUserById(req.params.id);
        console.log(result);
        res.status(200).json({ data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Internal error" });
    }
})

router.get("/auth", auth, async (req, res, next) => {
    try {
        res.status(200).json({ message: 'connecté' });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});


router.post("/signup",
    validateFieldsPOST({

        //vérification des champs saisies 
        email: [VLD_IS_EMAIL],
        password: [VLD_NOT_EMPTY_STRING],
        firstName: [VLD_NOT_EMPTY_STRING],
        lastName: [VLD_NOT_EMPTY_STRING],
        // image: [VLD_NOT_EMPTY_STRING],
    }),
    async (req, res, next) => {
        try {
            // Vérifier que l'email n'est pas déjà utilisé
            const isEmailUsed = await getUserByEmail(req.body.email, ['users_id']);

            if (isEmailUsed !== null) {

                res.status(400).json({ data: null, message: "Cet email est déjà utilisé" });
            } else {
                next();
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    },

    async (req, res, next) => {
        try {
            const result = await addUser(
                req.body.email,
                req.body.password,
                req.body.firstName,
                req.body.lastName,
                (req.body.image || ""),
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

        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    }
);

router.put('/profil/:id', auth, authUserId, async (req, res, next) => {
    try {
        const result = await putUserById(req.params.id, req.body.firstName, req.body.lastName, req.body.image);
        const user = await getUserById(req.params.id);
        res.status(200).json({ data: user, message: "Profil modifié" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }

})

router.put('/disable/:id', auth, authUserId, async (req, res, next) => {
    try {
        const result = await disableUserById(req.params.id);
        res.status(200).json({ data: null, message: "profil supprimé" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }
})

router.post('/search', async (req, res, next) => {
    try {
        console.log("body dans route", req.body);

        const userId = await getUserByName(req.body.lastName, req.body.firstName);
        const message = await getAllMessagesByUserId(userId.users_id);
        console.log(message);

        console.log(userId);
        res.status(200).json({ data: message, message: "profil trouvé" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }
})

// router.delete('/profil/:id', auth, authUserId, async (req, res, next) => {
//     try {
//         const result = await deleteUserById(req.params.id);
//         res.status(200).json({ data: null, message: "profil supprimé" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ data: null, message: "Erreur interne du serveur" });
//     }
// })