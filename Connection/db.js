// db.js
require('dotenv').config();
const mysql = require('mysql');
const {
    promisify
} = require('util');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const HOST = process.env.HOST;
const db = process.env.DB;

const dbConfig = {
    connectionLimit: 10, // Maximum number of connections in the pool
    host: HOST,
    user: dbUser,
    password: dbPassword,
    database: db
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool query method
pool.query = promisify(pool.query);



// Function to execute the stored procedure with parameters
function executeStoredProcedure(procedureName, params) {
    return new Promise((resolve, reject) => {
        // Acquire a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            // Prepare the SQL statement
            const sql = `CALL ${procedureName}('${params}')`;

            // Call the stored procedure with parameters
            connection.query(sql, (error, results) => {
                // Release the connection back to the pool
                connection.release();

                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}


module.exports = pool;