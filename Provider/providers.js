// this section is provider to handle service that reusable
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
            // const sql = `CALL ${procedureName}('${params}')`;
            const sql = normalizeParams(procedureName, params);

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

function normalizeParams(procedureName, params) {
    let sql = `CALL ${procedureName}`;
    if (params) {
        sql += `(`;

        // If params is an array, join the values with commas
        if (Array.isArray(params)) {
            sql += params.map(param => `'${param}'`).join(',');
        } else {
            // If params is a single value, just add it
            sql += `'${params}'`;
        }

        sql += ')';
    }
    return sql;
}

module.exports = executeStoredProcedure;