
var my = require("mysql");
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
        dbProcess(op,postData);
        console.log("[log] "+op+" "+postData.data+" into DB");
    });

}


function dbProcess(op,data){
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
        console.log("in insert");
        connection.query('INSERT INTO `todolisttb` SET ?', data, function(err){
            if(err)
            console.log(err);
        });
    }
    if(op === "delete"){
        console.log("in delete");
        connection.query('DELETE FROM `todolisttb` WHERE ?', data, function(err){
            if(err)
            console.log(err);
        });
    }




    connection.end();
}
exports.mysqlE = mysqlE;

