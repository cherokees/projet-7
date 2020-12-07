import express from 'express';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
// import { addMessage, getAllMessages } from '../control/messages';
import { addComment, deleteCommentById, getCommentById, putCommentById, disableCommentById } from '../control/comment';
import authUserId from '../middleware/authUserId';

export const router = express.Router();

// '${userId}',
//         '${commentUser}',
//         '${escapeText(commentContent)}',
//         '${commentPostId}',
//         '${postId}'

router.post('/', auth, async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, 'RANDOM_TOKEN_KEY');

        const result = await addComment(
            decodedToken.userId,
            req.body.commentContent,
            req.body.postId,
            req.body.image
        );
        // const user = await getUserById(req.params.id);
        res.status(200).json({ data: result, message: "message posté" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }

})

// router.delete('/:id', auth, async (req, res, next) => {
//     try {
//         const result = await deleteCommentById(req.params.id);
//         res.status(200).json({ data: null, message: "commentaire supprimé" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ data: null, message: "Erreur interne du serveur" });
//     }
// })

router.put('/:id', auth, authUserId, async (req, res, next) => {

    try {
        const result = await putCommentById(req.body.commentId, req.body.comment, req.body.image);
        const comment = await getCommentById(req.body.commentId);
        res.status(200).json({ data: comment, message: "Commentaire modifié" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }

})

router.put('/disable/:id', auth, authUserId, async (req, res, next) => {

    try {
        const result = await disableCommentById(req.body.commentId); //ne supprime pas le commentaire mais le désactive
        const comment = await getCommentById(req.body.commentId);
        res.status(200).json({ data: comment, message: "Commentaire modifié" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, message: "Erreur interne du serveur" });
    }

})