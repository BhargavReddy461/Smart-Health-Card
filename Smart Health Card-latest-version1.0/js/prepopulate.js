var code = window.location.href;
var ref = code.substring(39, 42);
var num = code.substring(42, 52);

document.getElementById("number").value = ref + " " + num;
