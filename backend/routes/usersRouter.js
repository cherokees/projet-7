import express from 'express';
import { getAllUsers, addUser, getUserByEmail } from '../control/users';
import { validateFieldsPOST, VLD_IS_EMAIL, VLD_NOT_EMPTY_STRING, VLD_NO_SPECIAL_CHARS } from '../utils/validator';


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
        password: [VLD_NO_SPECIAL_CHARS],
    }),
    async (req, res, next) => {
        try {
            const result = await addUser(
                req.body.email,
                req.body.password,
                //     // req.body.firstName,
                //     // req.body.lastName,
            );
            res.status(200).json({ data: { id: result }, message: "Utilisateur créé" });
            // console.log(req.body)

        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    }
);

