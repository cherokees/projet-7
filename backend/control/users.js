const { getAllRows, sqlQuery } = require("../database/mysql");
// const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt';

//nom de la table dans la bdd
const tableName = 'users';
//nom des colonnes dans la table
const defaultReturnFields = ['users_id', 'users_email', 'users_first_name', 'users_last_name', 'users_created_date'];

//fonction asynchrone qui récupères tous les utilisateurs dans la bdd
export async function getAllUsers(returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName}`);
        return rows;
    } catch (err) {
        throw err;
    }
}

//fonction qui ajoute un utilisateur dans la bdd

//on précide en paramètre les champs à ajouté dans la table
export async function addUser(email, password, firstName, lastName) {
    try {

        //const qui contient une fonction synchrone, qui utilise le module bcrypt pour hasher le mdp
        const passwordHash = await bcrypt.hash(password, 10);

        //const qui contient la fonction native pour faire une requête SQL
        //requête qui ajoute les champs entré par l'utilisateur dans la table
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

//fonction getUserById qui récupère un utilisateur dans la base de données grace à son id
//prend en paramètre l'id et les champs de la table (qui sont égale à null par défaut)
export async function getUserById(userId, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        //requête SQL pour récupérer les champs concérné grace à l'id
        const rows = await sqlQuery(`SELECT ${returnFields} FROM ${tableName} WHERE users_id=${userId}`);
        //retourne tous les champs trouvé si ils ne sont pas égale à null
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

//fonction getUserByEmail qui récupère un utilisateur via son email
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

//fonction putUserById qui change les champs first_name et/ou last_name
export async function putUserById(userId, firstName, lastName) {
    try {
        await sqlQuery(`UPDATE ${tableName} SET users_first_name = '${firstName}', users_last_name = '${lastName}' WHERE users_id='${userId}'`);
        return true;
    } catch (err) {
        throw err;
    }
}