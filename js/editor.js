

  // window.addEventListener('DOMContentLoaded', () => {
  //   // Get the element by id
  //   const element = document.getElementById("p1");
  //   // Add the ondragstart event listener
  //   element.addEventListener("dragstart", dragstart_handler);
  // });
document.getElementById('editor').innerhtml='';
document.getElementById('new_scripts').innerhtml='';
let new_scripts = document.getElementById('new_scripts');
let editor = document.getElementById('editor');
let x = 30;
let y = 20;
for (let i = 0; i < y; i++)
{
  for (let i0 = 0; i0 < x; i0++)
  {
    celltext="<div id='target' class='script_box' ondrop='drop_handler(event)' ondragover='dragover_handler(event)'></div>";
    editor.innerHTML+=celltext;
  }
  editor.innerHTML+="<br>";
}

let add_script_menu_opened = 0;
function toggleAddScriptMenu(){
  let add_script_menu = document.getElementById("add_script_menu");
  if (add_script_menu_opened == 0)
  {
    add_script_menu.classList.remove("hidden");
    add_script_menu_opened = 1;
  }
  else
  {
    add_script_menu.classList.add("hidden");
    add_script_menu_opened = 0;
  }
}

let placed_scripts = [];

let base_scripts_count = 1;
  function addScript(script_name) {
    let colour = "yellow";
    placed_scripts.push({ id: base_scripts_count, name: script_name, active: 0, completed: 0 });
    let script_label = script_name;
    celltext= "<div id='div" + base_scripts_count + "' class='script_itself " + colour + "' draggable='true' onclick='scriptClicked(" + base_scripts_count + ")' ondragstart='dragstart_handler(event)'>" + script_label + "</div>";
    new_scripts.innerHTML+=celltext;
    base_scripts_count++;
    toggleAddScriptMenu();
  }

let connecting = 0;
let connect_mode;
function connectModeSwitch(){
  connect_mode = document.getElementById("connect_mode");
  if ( connecting == 0 ) {
    connecting = 1;
    connect_mode.classList.add("green");
  }
  else if ( connecting != 0 ) {
      connecting = 0;
      connect_mode.classList.remove("green");
  }
}

let selected_script;
function scriptClicked(id){
  if (connecting == 1){
    connecting = 2;
    selected_script = id;
  }
  else if (connecting == 2) {
    connectScripts(selected_script, id);
    connecting = 1;
  }
}

let script_connections = [];

let connections_count = 0;
function connectScripts(from_id, to_id){

    script_connections.push({from: from_id, to: to_id});
    //console.log(script_connections[connections_count].from + " -> " + script_connections[connections_count].to);
    //console.log(script_connections);
    connections_count++;
    updateCanvasConnections();
}

let canvas = document.getElementById('connections');
let ctx = canvas.getContext('2d');
//ctx.fillStyle = 'rgb(200, 0, 0)';

//let shit = 1;

function updateCanvasConnections(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < connections_count; i++)
  {
    let x1,y1,x2,y2,obj1,obj2;
    obj1 = document.getElementById("div"+script_connections[i].from);
    obj2 = document.getElementById("div"+script_connections[i].to);
    x1 = obj1.offsetLeft;
    y1 = obj1.offsetTop;
    x2 = obj2.offsetLeft;
    y2 = obj2.offsetTop;
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(10, 10);
    // ctx.lineTo(30, 30);
    // ctx.stroke();
    //alert("drew!");
    //alert(x1+"   "+y1);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    //ctx.fillRect(x1, y1, x2, y2);
    //ctx.fillRect(x1/10, y1/10, x1/10 + 10, y1/10 + 10);
  }


  //shit++;
}

function startGame(){
  sessionStorage.setItem("connections", JSON.stringify(script_connections));
  sessionStorage.setItem("scripts", JSON.stringify(placed_scripts));
}


function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("application/my-app", ev.target.id);
 ev.dataTransfer.effectAllowed = "move";
}
function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move"
}
function drop_handler(ev) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 const data = ev.dataTransfer.getData("application/my-app");
 ev.target.appendChild(document.getElementById(data));
 updateCanvasConnections();
}
