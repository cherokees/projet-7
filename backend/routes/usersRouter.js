import express from 'express';
import { getAllUsers, addUser } from '../control/users';
import { validateFieldsPOST, VLD_NOT_EMPTY_STRING } from '../utils/validator';

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

router.post("/register",
    validateFieldsPOST({
        email: [VLD_NOT_EMPTY_STRING],
        password: [VLD_NOT_EMPTY_STRING],
        firstName: [VLD_NOT_EMPTY_STRING],
        lastName: [VLD_NOT_EMPTY_STRING],
    }),
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
        email: [VLD_NOT_EMPTY_STRING],
        password: [VLD_NOT_EMPTY_STRING],
    }),
    async (req, res, next) => {
        try {
            // const result = await addUser(
            //     req.body.email,
            //     req.body.password,
            //     // req.body.firstName,
            //     // req.body.lastName,
            // );
            // res.status(200).json({ data: { id: result }, message: "Utilisateur créé" });
            console.log(req.body)
            res.status(200).json({ message: "Utilisateur créé" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ data: null, message: "Erreur interne du serveur" });
        }
    }
);

