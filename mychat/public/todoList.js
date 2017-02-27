var todos = [];
var xmlhttp = new XMLHttpRequest();
var tempStuff = {};
function post(path,params,method){
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params){
        if(params.hasOwnProperty(key)){
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value",params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.append(form);
    form.submit();
}

function remove() {
    var id = this.getAttribute('id');
    var task = todos[id].data;
    //console.log(task);

    var stuff = {op:"delete",data:task};

    //console.log(stuff);
    post("/MYSQL",stuff );
    show(function(){
        recAjax(function(){
            render();
        });
    });
    //return false;
}

function add(callback) {
    var task = document.getElementById('task').value;
    document.getElementById("task").value = "";

    var stuff = {op:"insert",data:task};
    tempStuff = stuff;
    //post("/MYSQL",stuff );
    console.log("11111");
    callback();
}

function show(reqType,data,callback) {
    xmlhttp.open("POST",reqType,true);
    console.log("22222");
    //console.log({op:"insert"});
    xmlhttp.setRequestHeader("Content-type", "application/json");
    var params = "lorem=ipsum&name=binny";
    xmlhttp.send({op:"insert", data:"kkk"});

    callback(); 
}   

function recAjax(callback){
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            todos = JSON.parse(xmlhttp.responseText);
            console.log("33333");
            console.log(todos.length);
            callback();
            
            for(var i=0;i<todos.length;i++){
                //console.log(todos[i]);
            }

        }
         
    }
}

function render(){
    console.log("44444");
    //console.log("2222"+todos);
    document.getElementById('todos').innerHTML = "";
    var html = '<ul>';
    //console.log("todos="+todos);
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i].data + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}


document.getElementById('add').addEventListener('click', function(){
    add(function(){
        show("/MYSQL",tempStuff,function(){
            recAjax(function(){
                render();
            });
        });
    });
});


document.getElementById('ajax').addEventListener('click', ajax);
show("/ajaxtest"," ",function(){
    recAjax(function(){
        render();
    });
});
