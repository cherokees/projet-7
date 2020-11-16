const { getAllRows, sqlQuery } = require("../database/mysql");

import bcrypt from 'bcrypt';
import { getMessageComments } from './comment';

//nom de la table dans la bdd
const tableName = 'messages';
//nom des colonnes dans la table
const defaultReturnFields = ['msg_id', 'msg_user_id', 'msg_title', 'msg_content', 'msg_attachment', 'msg_date'];

// MOVE
function escapeText(paraTxt) {
    return paraTxt.split("'").join("\\'");
}//fin fct

// console.log(escapeText("c'est la fin"));

export async function addMessage(userId, msgTitle, message) {
    try {
        const result = await sqlQuery(`INSERT INTO ${tableName} (
        msg_user_id, msg_title, msg_content
    )
    VALUES (
        '${userId}',
        '${msgTitle}',
        '${escapeText(message)}'
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
            `SELECT ${returnFields}, u.users_first_name, u.users_last_name
            FROM \`messages\` m
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

// table messages : champ pour id du parent
// création de message (pas un commentaire) : id parent = 0 par défaut 
// getAllMessages: ne prendre que les messages où l'id du parent = 0


// Appeler getAllMessages et getMessageComments successivement dans la route
// ajouter une clé comments dans le message, et y coller la liste (rows) obtenue par getMessageComments