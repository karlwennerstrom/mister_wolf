const mysql = require('mysql')
var db_config = {
    connectionLImit:4,
    host:'us-cdbr-east-06.cleardb.net',
    user:'b39bb4d3711279',
    password:'e4124551',
    database:'heroku_e127056c9502aab'
  };


let conexion;
function handleDisconnect(){
    conexion= mysql.createPool(db_config); // Recreate the connection, since
// const conexion =  mysql.createConnection({
//     host:'us-cdbr-east-06.cleardb.net',
//     user:'b39bb4d3711279',
//     password:'e4124551',
//     database:'heroku_e127056c9502aab'
// })



conexion.getConnection(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else{
        console.log('Conectado a DB')
    }                                    // to avoid a hot loop, and to allow our node script to
})                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
conexion.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
});
}
handleDisconnect();

module.exports=conexion
