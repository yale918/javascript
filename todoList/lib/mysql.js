
var my      = require("mysql");
var mime    = require("mime");
var querystring = require("querystring");

function mysqlE(req,res){
    var postData ={};
    var testData ={};

    var body = "";
    req.on('data',function(data){
        body+=data;
    });
    req.on('end',function(){
        postData = querystring.parse(body);
         const op = postData.op;
        delete postData.op;
        dbProcess(op,postData,res);
    });
}

function dbProcess(op,data,res){
    var connection = my.createConnection({
        host:'localhost',
        user:'yale918',
        password:'yeah31212',
        database:'todolistdb'
    });

    connection.connect();

    if(op === "insert"){
        console.log("[client] request /MYSQL > "+op+" "+data.data);
        //console.log("in insert");
        connection.query('INSERT INTO `todolisttb` SET ?', data, function(err){
            if(err)
                console.log(err);
        });
        selectDB(connection,res);

    }
    if(op === "delete"){
        console.log("[client] request /MYSQL > "+op+" "+data.data);
        //console.log("in delete");
        connection.query('DELETE FROM `todolisttb` WHERE ?', data, function(err){
            if(err)
            console.log(err);
        });
        selectDB(connection,res);
    }
    if(op === "select"){
        var query = 
        connection.query('SELECT * FROM `todolisttb`', function(err, result){
            if(err){
                console.log(err);
            }
            var resultJ = JSON.stringify(result);
            //console.log(resultJ);
            res.writeHead(200,{"Content-Type":'application/json'});
            res.write(resultJ);
            res.end();
        });


    }
    connection.end();
}

function selectDB(conn,res){
    conn.query('SELECT * FROM `todolisttb`', function(err, result){
            if(err){
                console.log(err);
            }
            var resultJ = JSON.stringify(result);
            res.writeHead(200,{"Content-Type":'application/json'});

            res.write(resultJ);
            res.end();
        });
}

exports.mysqlE = mysqlE;
exports.dbProcess = dbProcess;

