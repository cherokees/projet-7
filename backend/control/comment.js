import { escapeText } from "../utils/escape";

const { sqlQuery } = require("../database/mysql");


//nom de la table dans la bdd
const tableName = 'comments';
//nom des colonnes dans la table
const defaultReturnFields = ['comment_id', 'comment_user_id', 'comment_content', 'comment_date', 'comment_post_id', 'comment_image'];



export async function addComment(userId, commentContent, postId, image) {
    try {
        const result = await sqlQuery(`INSERT INTO ${tableName} (
            comment_user_id, comment_content, comment_post_id, comment_image
        )
        VALUES (
            '${userId}',
            '${escapeText(commentContent)}',
            '${postId}',
            '${image}'
        )`);
        return result.insertId;
    } catch (err) {
        throw err;
    }
}

export async function getCommentById(commentId, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        //requête SQL pour récupérer les champs concérné grace à l'id
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName} WHERE comment_id=${commentId}`);
        //retourne tous les champs trouvé si ils ne sont pas égale à null
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

export async function getMessageComments(postId, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        const rows = await sqlQuery(
            `SELECT ${returnFields}, u.users_first_name, u.users_last_name, u.users_image
            FROM ${tableName} c
            JOIN users u
            ON c.comment_user_id = u.users_id
            WHERE c.comment_post_id = ${postId}
            ORDER BY c.comment_date`
        );
        return rows;
    } catch (err) {
        throw err;
    }
}

export async function deleteCommentById(commentId) {
    try {
        await sqlQuery(`DELETE FROM ${tableName} WHERE comment_id=${commentId}`);
        return true;
    } catch (err) {
        throw (err)
    }
}

export async function putCommentById(commentId, comment, image) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET comment_content = '${escapeText(comment)}', comment_image = '${image}'
        WHERE comment_id=${commentId}`);
        return true;
    } catch (err) {
        throw err;
    }
}

export async function disableCommentById(commentId) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET comment_content = ${null}, comment_image = ${null}
        WHERE comment_id=${commentId}`);
        return true;
    } catch (err) {
        throw (err)
    }
}
// SET comment_content = 'commentaire supprimé'

