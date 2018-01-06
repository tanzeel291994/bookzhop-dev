var mysql = require('mysql');
var main;

function connectDatabase() {
	// if the pool doesn't exist, create it
    if (!main) {
      // enter your db config here
      var main = mysql.createPool({
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'bookzhop'
    });
	
    main.getConnection(function(err){
      if(!err) {
         console.log('Database is connected!');
      } else {
          console.log('Error connecting database!');
      }
    });

    return main;
    }
}
//export the function above so that all of our routes can include this script, and call main.GetConnection whenever they need a connection.
module.exports = connectDatabase();