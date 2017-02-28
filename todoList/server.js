const	http	=	require("http");
const	fs		=	require("fs");
const	mime	=	require("mime");
const	path 	=	require("path");
const	route 	=	require("./lib/route");
const 	mysql 	= 	require("./lib/mysql")

const port = 8000;

const server = http.createServer();

const basePath = "./public";
var counter = 0;

server.on("request",function(request,response){
	var reqPath = request.url;
	var method  = request.method;
	var pathString = "";
	

	if(reqPath==="/"){
		pathString = basePath+"/index.html";          //OKKKKKKKKKK
		servStatic(pathString,response);
	}
	else{
		if(reqPath==="/MYSQL"){
			//servStatic("./lib/mysql.js",response);
			route.route(reqPath,request,response);

		}else if(reqPath==='/selectDB'){
			mysql.dbProcess('select','0',response);

		}
		else{
			pathString = basePath+reqPath;
			servStatic(pathString,response);
		}
		
	}
	counter++;
});

server.listen(port, function(){
	console.log("[log] mychat server running on port: "+port);
})

function servStatic(filepath,res){
	//console.log("[log]serving file: "+filepath);
	var dataType = mime.lookup(path.basename(filepath));

	fs.readFile(filepath,function(err, data){
		if(err)	
			sendErrorMessage(404,res);
		else
			sendResponse(res,data,dataType);
	});
}

function sendResponse(res,data,dataType){
	//console.log("dataType: "+dataType);
	res.writeHead(200,{'Content-Type':dataType});
	res.write(data);
	res.end();
}

function sendErrorMessage(errCode,res){
	if(errCode == 404){
		res.writeHead(errCode,{'Content-Type':'tenxt/plain'});
		console.log("in sendErrorMessage");
		res.write('Error '+errCode+': resource not found.')
		res.end();
	}
}
