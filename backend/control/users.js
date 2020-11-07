const { getAllRows, sqlQuery } = require("../database/mysql");
// const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt';

const tableName = 'users';
const defaultReturnFields = ['users_id', 'users_email', 'users_first_name', 'users_last_name', 'users_created_date'];

export async function getAllUsers(returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName}`);
        return rows;
    } catch (err) {
        throw err;
    }
}

export async function addUser(email, password, firstName, lastName) {
    try {

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await sqlQuery(`INSERT INTO ${tableName} (
            users_email, users_password, users_first_name, users_last_name
        )
        VALUES (
            '${email}',
            '${passwordHash}',
            '${firstName}',
            '${lastName}'

        )`);
        return result.insertId;
    } catch (err) {
        throw err;
    }
}

export async function getUserById(userId, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        // const rows = await findUsersBy({ id: userId });
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName} WHERE users_id=${userId}`);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

export async function getUserByEmail(email, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        // const rows = await findUsersBy({ email: email });
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName} WHERE users_email='${email}'`);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

export async function putUserById(userId, firstName, lastName) {
    try {
        await sqlQuery(`UPDATE ${tableName} SET users_first_name = '${firstName}', users_last_name = '${lastName}' WHERE users_id='${userId}'`);
        return true;
    } catch (err) {
        throw err;
    }
}