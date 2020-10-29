// import mysql from 'mysql';
const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania',
    connectionLimit: 20,
};

// const connection = mysql.createConnection(config);


//creation d'un pool (cache de connection) de connection (permet de mettre les différentes connections en file d'attente).
const pool = mysql.createPool(config);

//la fonction sqlQuery traite les requête envoyé de manière asynchrone. (équivalent de fetch)
export function sqlQuery(queryString) {
    //Promise = une fonction qui attends (qui met du temps à s'éxécuter). 
    return new Promise(async (resolve, reject) => {
        //pool envoie une requête à la base de données.
        pool.query(queryString, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//getAllRows nous renvoie toutes les lignes de la table nommée
export async function getAllRows(tableName) {
    try {
        const rows = await sqlQuery(`SELECT * from ${tableName}`);
        return rows;
    } catch (err) {
        throw err;
    }
}