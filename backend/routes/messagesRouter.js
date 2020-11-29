import express from 'express';
import { validateFieldsPOST, VLD_IS_EMAIL, VLD_NOT_EMPTY_STRING, VLD_NO_SPECIAL_CHARS } from '../utils/validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
import authUserId from '../middleware/authUserId';
import { addMessage, getAllMessages, putMessageById, getMessageById } from '../control/messages';
import { getMessageComments } from '../control/comment';

export const router = express.Router();


router.post('/', auth, async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, 'RANDOM_TOKEN_KEY');

        console.log("req.body", req.body);
        const result = await addMessage(decodedToken.userId, req.body.titleMsg, req.body.message, req.body.image);
        // const user = await getUserById(req.params.id);
        res.status(200).json({ data: result, message: "message posté" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }

})

router.get("/", auth, async (req, res, next) => {
    try {
        const rows = await getAllMessages();
        res.status(200).json({ data: rows });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});

router.put("/:id", auth, authUserId, async (req, res, next) => {
    try {
        const rows = await putMessageById(req.body.postId, req.body.messagePutContent, req.body.image);
        const refreshMessage = await getMessageById(req.body.postId);
        res.status(200).json({ data: refreshMessage, message: "le rafraichissement c'est fait" });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});

router.get("/comments/:id", auth, async (req, res, next) => {
    try {
        const rows = await getMessageComments(req.params.id);
        res.status(200).json({ data: rows });
    } catch (err) {
        console.error(err); // On affiche l'erreur côté serveur
        res.status(500).json({ data: null, message: "Internal error" }); // L'erreur renvoyée est générique
    }
});