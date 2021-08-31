const mysql = require('mysql');

var mySqlCon = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
});

mySqlCon.connect((err)=>{
    if(!err){
        console.log('Connection Successful')
    }
    else{
        console.log('Failed'+JSON.stringify(err,undefined,2))
    }
});

module.exports = mySqlCon;