window.alert("hello rrrr");

document.getElementById("addBtn").addEventListener('click',function(){
  var getTextString = document.getElementById("getText").value;
  console.log(getTextString);
  document.getElementById("getText").value = "";
});
