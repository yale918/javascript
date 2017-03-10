function add() {

}

function remove(){

}

function show(){
  var todos = get_todos();
  console.log(todos);
}

function init_todos(){
  var todos = [];
  localStorage.setItem('todos',JSON.stringify(todos));
  show();
}

function get_todos(){
  var todos_str = localStorage.getItem('todos');
  return JSON.parse(todos_str);
}
init_todos();
show();
