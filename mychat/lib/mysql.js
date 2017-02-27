
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
        console.log("kkk > "+postData);
        const op = postData.op;
        console.log("ppp > "+op);
        delete postData.op;
        dbProcess(op,postData);
        console.log("[log] "+op+" "+postData.data+" >> MySQL");
    });

}


function dbProcess(op,data,res){
    //console.log(data);
    var connection = my.createConnection({
        host:'localhost',
        user:'yale918',
        password:'yeah31212',
        database:'todolistdb'
    });

    connection.connect();

    //console.log("op= "+op);
    if(op === "insert"){
        //console.log("in insert");
        connection.query('INSERT INTO `todolisttb` SET ?', data, function(err){
            if(err)
            console.log(err);
        });
    }
    if(op === "delete"){
        //console.log("in delete");
        connection.query('DELETE FROM `todolisttb` WHERE ?', data, function(err){
            if(err)
            console.log(err);
        });
    }
    if(op === "select"){
        var query = 
        connection.query('SELECT * FROM `todolisttb`', function(err, result){
            if(err){
                console.log(err);
            }
            resultJ = JSON.stringify(result);
            //console.log(resultJ);
            res.writeHead(200,{"Content-Type":'application/json'});

            for(var i=0;i<500;i++){}
            for (var i in result){
                console.log(result[i].data);
            }
            //console.log("result= "+resultJ);
            res.write(resultJ);
            res.end();
        });


    }




    connection.end();
}




exports.mysqlE = mysqlE;
exports.dbProcess = dbProcess;

