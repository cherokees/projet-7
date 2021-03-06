const { sqlQuery } = require("../database/mysql");
import bcrypt from 'bcrypt';
import { getMessageComments } from './comment';


//nom de la table dans la bdd
const tableName = 'users';
//nom des colonnes dans la table
const defaultReturnFields = ['users_id', 'users_email', 'users_first_name', 'users_last_name', 'users_created_date', 'users_image'];

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
export async function addUser(email, password, firstName, lastName, image = "") {
    try {

        //const qui contient une fonction synchrone, qui utilise le module bcrypt pour hasher le mdp
        const passwordHash = await bcrypt.hash(password, 10);

        //const qui contient la fonction native pour faire une requête SQL
        //requête qui ajoute les champs entré par l'utilisateur dans la table
        const result = await sqlQuery(`INSERT INTO ${tableName} (
            users_email, users_password, users_first_name, users_last_name, users_image
        )
        VALUES (
            '${email}',
            '${passwordHash}',
            '${firstName}',
            '${lastName}',
            '${image}'

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

//fonction getUserByName qui récupère un utilisateur via son nom/prénom
export async function getUserByName(lastName, firstName, returnFields = null) {
    try {
        returnFields = returnFields || defaultReturnFields;
        const rows = await sqlQuery(`
        SELECT ${returnFields}
        FROM ${tableName}
        WHERE users_last_name = '${lastName}'
        AND users_first_name = '${firstName}'
        `);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw err;
    }
}

//fonction putUserById qui change les champs first_name et/ou last_name
export async function putUserById(userId, firstName, lastName, image) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET users_first_name = '${firstName}', users_last_name = '${lastName}', users_image = '${image}' 
        WHERE users_id='${userId}'`);
        return true;
    } catch (err) {
        throw err;
    }
}

export async function disableUserById(userId) {
    try {
        await sqlQuery(`
        UPDATE ${tableName} 
        SET users_first_name = 'utilisateur supprimé', users_last_name = '', users_email='', users_password=''
        WHERE users_id='${userId}'`);
        return true;
    } catch (err) {
        throw (err)
    }
}

//fonction qui permet de récupérer tous les messages posté par un utilisateur
export async function getCommentPostId(userId) {
    try {
        let rows;

        rows = await sqlQuery(`
            SELECT msg_id
            FROM messages
            WHERE msg_user_id = '${userId}'
        `)

        let idList = rows.map(message => message.msg_id);

        rows = await sqlQuery(`
        SELECT comment_post_id 
        FROM comments 
        WHERE comment_user_id = '${userId}' 
        GROUP BY comment_post_id
        `)

        // let resultArr = [];

        let idList2 = rows.map(message => message.comment_post_id)

        idList2 = idList2.filter(element => !idList.includes(element));
        // const idMerge = idList.concat(idList2);  //Méthode A : concatène les deux tableau
        const idMerge = [...idList, ...idList2];    //Méthode B : concatène les deux tableau (les "..." signifie les valeurs du tableau sans le tableau)

        rows = await sqlQuery(
            `SELECT m.*, u.users_first_name, u.users_last_name, u.users_image
            FROM messages m
            JOIN users u
            ON m.msg_user_id = u.users_id
            WHERE m.msg_id IN (${idMerge})
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


// export async function deleteUserById(userId) {
//     try {
//         await sqlQuery(`DELETE FROM ${tableName} WHERE users_id='${userId}'`);
//         return true;
//     } catch (err) {
//         throw (err)
//     }
// }

// Réecriture des données: email/password vide, firtsName lastName à remplacer 
// '/login': ne pas tenir compte des emails vides 







//fonction de recherche des msg 

//SELECT msg_id FROM message WHERE msg_user_id = 48
//SELECT comment_post_id FROM `comments` WHERE `comment_user_id`= 48 GROUP BY comment_post_id

// JS : fusionne les deux listes d'id
// JS : éliminer les doublons => une liste d'id de messages uniques

// messageList = []
// for postId of [liste d'ids]
//  const message = await getMessageById(postId) // => message
//  message.comments = await getMessageComments(postId);

// renvoi de messageList

