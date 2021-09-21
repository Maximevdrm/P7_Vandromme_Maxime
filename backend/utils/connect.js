// get the client
const mysql = require('mysql2');

module.exports={
    // create the connection to database
    connection: mysql.createConnection({
        host: 'localhost',
        user: 'Maxime',
        database: 'groupomania',
        password: 'Maximevdrm2010',
    }),

    // verif de l'admin
    isAdmin: (userId) => {
        connectUtils.connection.query('SELECT admin FROM groupomania.users WHERE id = ? AND deleted = 0',
        [userId], 
        function(err, results){
            if(!err && results.length == 1){
                return results[0];
            }
            else {
                return false;
            }
        });
    },
};