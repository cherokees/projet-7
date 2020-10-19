// import mysql from 'mysql';
const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    connectionLimit: 20,
};

// const connection = mysql.createConnection(config);

const pool = mysql.createPool(config);

export function sqlQuery(queryString) {
    return new Promise(async (resolve, reject) => {
        pool.query(queryString, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

export async function getAllRows(tableName) {
    try {
        const rows = await sqlQuery(`SELECT * from ${tableName}`);
        return rows;
    } catch (err) {
        throw err;
    }
}