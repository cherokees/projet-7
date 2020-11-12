const { getAllRows, sqlQuery } = require("../database/mysql");

import bcrypt from 'bcrypt';

//nom de la table dans la bdd
const tableName = 'messages';
//nom des colonnes dans la table
const defaultReturnFields = ['msg_id', 'msg_user_id', 'msg_title', 'msg_content', 'msg_attachment', 'msg_date'];

export async function addMessage(userId, msgTitle, message) {
    try {
        const result = await sqlQuery(`INSERT INTO ${tableName} (
        msg_user_id, msg_title, msg_content
    )
    VALUES (
        '${userId}',
        '${msgTitle}',
        '${message}'
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
        return rows;
    } catch (err) {
        throw err;
    }
}
