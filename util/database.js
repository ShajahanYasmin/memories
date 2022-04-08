const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",

  port: "3307",
  database: "photography",
  

});

module.exports = pool.promise();
