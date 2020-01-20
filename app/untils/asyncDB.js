const mysql = require('mysql')
const pool = mysql.createPool({
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASS,
    database:  process.env.DB_NAME,
})

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        console.log( rows )
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = { query }