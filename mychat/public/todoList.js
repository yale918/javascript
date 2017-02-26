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



function init_todos(){
	todos = [];
	localStorage.setItem('todo', JSON.stringify(todos));
	show();
}

function get_todos() {
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = document.getElementById('task').value;
 	document.getElementById("task").value = "";
    todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    var stuff = {op:"insert",data:task};

    console.log(stuff);
    post("/MYSQL",stuff );

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var task = todos[id];
    todos = get_todos();
    todos.splice(id, 1);

    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    var stuff = {op:"delete",data:task};

    console.log(stuff);
    post("/MYSQL",stuff );
    return false;
}
 
function show() {
    todos = get_todos();
 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}


document.getElementById('add').addEventListener('click', add);
init_todos();
show();