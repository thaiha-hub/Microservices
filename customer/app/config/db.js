const mysql = require('mysql2');
const config = require('./config.js');  // your config file

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : config.APP_DB_HOST,
  user            : config.APP_DB_USER,
  password        : config.APP_DB_PASSWORD,
  database        : config.APP_DB_NAME
});

module.exports = pool;
