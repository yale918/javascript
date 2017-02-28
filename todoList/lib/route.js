const mysql = require("./mysql");

function route(path,req,res){
	var handle = [];
	handle["/MYSQL"] = mysql.mysqlE;

	handle[path](req,res);
}

exports.route = route;