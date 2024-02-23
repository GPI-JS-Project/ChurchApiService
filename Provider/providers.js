// provider.js
const pool = require('../Connection/db');

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

module.exports = executeStoredProcedure;