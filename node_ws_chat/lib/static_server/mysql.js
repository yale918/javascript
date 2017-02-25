
var my = require("mysql");
var querystring = require("querystring");



function mysqlE(req,res){

    res.end("mysql success!!");

    console.log("hello 0");


    if(req.method=="POST"){

        console.log("method is: "+req.method);
        var body = '';



        req.on('data', function(data){
            console.log("hello 1");
            body += data;
            console.log("hello 2");
        });



        req.on('end', function(){
            var postData = querystring.parse(body);

            var data = {
                id : postData.id,
                pw : postData.pw
            }
            
            dbProcess(data);
        });
    }

}


function dbProcess(data){

    var connection = my.createConnection({
        host:'localhost',
        user:'yale918',
        password:'yeah31212',
        database:'testDB'
    });

    connection.connect();

    connection.query('INSERT INTO `testTB` SET ?', data, function(err){
        if(err)
        console.log(err);
    });
    connection.end();
}
exports.mysqlE = mysqlE;

