const { sqlQuery } = require("../database/mysql");
// import multer from 'multer';
import { escapeText } from '../utils/escape';

import { getMessageComments } from './comment';

//nom de la table dans la bdd
const tableName = 'messages';
//nom des colonnes dans la table
const defaultReturnFields = ['msg_id', 'msg_user_id', 'msg_title', 'msg_content', 'msg_attachment', 'msg_date', 'msg_image'];

export async function addMessage(userId, msgTitle, message, image) {
    try {
        const result = await sqlQuery(`INSERT INTO ${tableName} (
        msg_user_id, msg_title, msg_content, msg_image
    )
    VALUES (
        '${userId}',
        '${msgTitle}',
        '${escapeText(message)}',
        '${image}'
    )`);
        return result.insertId;
    } catch (err) {
        throw err;
    }
}

export async function getAllMessages(returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        const rows = await sqlQuery(
            `SELECT ${returnFields}, u.users_first_name, u.users_last_name, u.users_image
            FROM ${tableName} m
            JOIN users u
            ON m.msg_user_id = u.users_id
            ORDER BY m.msg_date DESC`);

        //on fait appelle à une boucle forof pour itérer sur chaque message et y ajouter les commentaires posté.

        for (const message of rows) {
            message.comments = await getMessageComments(message.msg_id);
        }

        return rows;
    } catch (err) {
        throw err;
    }
}

export async function getMessageById(postId, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        //requête SQL pour récupérer les champs concérné grace à l'id
        const rows = await sqlQuery(`
        SELECT ${returnFields}, u.users_first_name, u.users_last_name, u.users_image
        FROM ${tableName} m
        JOIN users u
        ON m.msg_user_id = u.users_id
        WHERE msg_id=${postId}
        `);
        //retourne toutes les premières valeurs des champs trouvé si ils ne sont pas égale à null
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

export async function putMessageById(postId, messagePutContent, image) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET msg_content = '${escapeText(messagePutContent)}', msg_image = '${image}'
        WHERE msg_id=${postId}`);
        return true;
    } catch (err) {
        throw err;
    }
}

export async function disableMessageById(postId) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET msg_content = ${null}, msg_image = ${null}
        WHERE msg_id=${postId}`);
        return true;
    } catch (err) {
        throw (err)
    }
}


// Appeler getAllMessages et getMessageComments successivement dans la route
// ajouter une clé comments dans le message, et y coller la liste (rows) obtenue par getMessageComments




