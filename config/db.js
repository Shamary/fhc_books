var mysql=require("mysql");

var db=mysql.createConnection({
   host:process.env.HOST,
   user:process.env.DB_USERNAME,
   password:process.env.DB_PASSWORD,
<<<<<<< HEAD
   database:process.env.DB_NAME,
   multipleStatements:true
=======
   database:process.env.DB_NAME
>>>>>>> 8008b9e091b310b4513cd5a0add2883eeaa576ad
});

db.connect();

module.exports = db;