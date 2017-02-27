var todos = [];

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


function add() {
    var task = document.getElementById('task').value;
 	document.getElementById("task").value = "";

    var stuff = {op:"insert",data:task};

    console.log(stuff);
    post("/MYSQL",stuff );

    show(render);
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var task = todos[id].data;
    console.log(task);

    var stuff = {op:"delete",data:task};

    console.log(stuff);
    post("/MYSQL",stuff );
    show(render);
    return false;
}

function show(callback) {
    //console.log("hello ajax");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/ajaxtest",true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            console.log("hi");
            todos = JSON.parse(xmlhttp.responseText);
            callback();
            for(var i=0;i<todos.length;i++){
                //console.log(todos[i]);
            }

        }
         
    }

    xmlhttp.send();
    
}
function render(){
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


/*
function get_todos(){
    console.log("hello ajax");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/ajaxtest",true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            todos = JSON.parse(xmlhttp.responseText);
            for(var i=0;i<todos.length;i++){
                console.log(todos[i]);
            }
        }
    }
    xmlhttp.send();
    return false;
}
*/



document.getElementById('add').addEventListener('click', add);
document.getElementById('ajax').addEventListener('click', ajax);
show(render);