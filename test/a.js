


function a(callback){
	for (var i=0;i<50;i++)
		console.log(i);
	callback(i);
}


function b(callback){
	for (var j=50;j<100;j++)
		console.log(j);
	callback(j);
}

a(function (){
	b(function(){
		console.log("finish!!")
	})
});



