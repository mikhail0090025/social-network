const mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: "newdb"
  });
  connection.connect();
  connection.query("SELECT * FROM Person", function (error, result) {
    if(error) console.log(error);
    else{
        console.log(result);
    }
  });
module.exports = {
    req1: function(request, callback) {
        connection.query(request, function(error, result) {
            if(error) {
                console.log(error);
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    },
    req2: function(request, list, callback) {
        connection.query(request, list, callback);
    }
};
