const	http	=	require("http");
const	fs		=	require("fs");
const	mime	=	require("mime");
const	path 	=	require("path");

const port = 8000;

const server = http.createServer();

const basePath = "./public";
var counter = 0;

server.on("request",function(request,response){
	var reqPath = request.url;
	var method  = request.method;
	var pathString = "";
	console.log("[reqData]reqPath= "+request.url);
	console.log("[reqData]method= "+request.method);
	if(reqPath==="/"){
		pathString = basePath+"/index.html";          //OKKKKKKKKKK
		servStatic(pathString,response);
	}
	else{
		if(reqPath==="/MYSQL"){
			servStatic("./lib/mysql.js",response);
			// router object

		}else{
			pathString = basePath+reqPath;
			servStatic(pathString,response);
		}
		
	}






	//response.end("hello world");
	counter++;
	console.log("[log] there are "+counter+" times request");
});

server.listen(port, function(){
	console.log("mychat static server  is serving on port: "+port);
})


function servStatic(filepath,res){
	console.log("serving file: "+filepath);
	var dataType = mime.lookup(path.basename(filepath));

	fs.readFile(filepath,function(err, data){
		if(err)	
			sendErrorMessage(404,res);
		else
			sendResponse(res,data,dataType);
	});
}


function sendResponse(res,data,dataType){
	console.log("dataType: "+dataType);
	res.writeHead(200,{'Content-Type':dataType});
	res.write(data);
	res.end();
}

function sendErrorMessage(errCode,res){
	if(errCode == 404){
		res.writeHead(errCode,{'Content-Type':'text/plain'});
		console.log("in sendErrorMessage");
		res.write('Error '+errCode+': resource not found.')
		res.end();
	}
}
