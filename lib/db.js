const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodelogin',
    password: 'admin'
});
connection.connect();
module.exports = connection;