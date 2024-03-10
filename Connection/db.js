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
module.exports = pool;