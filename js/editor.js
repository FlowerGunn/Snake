
let i,i0;
  // window.addEventListener('DOMContentLoaded', () => {
  //   // Get the element by id
  //   const element = document.getElementById("p1");
  //   // Add the ondragstart event listener
  //   element.addEventListener("dragstart", dragstart_handler);
  // });
let script_library_default = [
  {
  script_label: "When game starts",
  script_name: "when_game_starts",
  colour: "yellow",
  script_function: `
    return 1;`
  },
  {
  script_label: "If score = X",
  script_name: "if_score_is_x",
  colour: "blue",
  script_function: `
    if (score == 1)
    return 1;
    return 0;`
  },
  {
  script_label: "When snake moves",
  script_name: "when_snake_moves",
  colour: "yellow",
  script_function: `
    return 0;`
  },
  {
  script_label: "Double snake speed",
  script_name: "speed_double",
  colour: "orange",
  script_function: `
    setSpeed( snake_interval /  2 );
    return 1;`
  },
  {
  script_label: "When food spawns",
  script_name: "when_food_spawns",
  colour: "yellow",
  script_function: `
    return 0;`
  },
  {
  script_label: "If direction = X",
  script_name: "if_direction_is_x",
  colour: "blue",
  script_function: `
  if (direction == "up")
  return 1;
  return 0;`
  },
  {
  script_label: "Change BG colour",
  script_name: "change_background_colour",
  colour: "orange",
  script_function: `
  field.style.background = "blue";
  return 1;`
  },
  {
  script_label: "When food spawns",
  script_name: "when_food_spawns",
  colour: "yellow",
  script_function: `
    return 0;`
  },
  {
  script_label: "Create counter",
  script_name: "create_variable",
  colour: "orange",
  script_function: `
  memory.counter_name = 0;
  return 1;`
  },
  {
  script_label: "Change counter",
  script_name: "change_variable",
  colour: "orange",
  script_function: `
  memory.counter_name = memory.counter_name + 1;
  return 1;`
  },
  {
  script_label: "If counter = x",
  script_name: "if_variable_is_x",
  colour: "blue",
  script_function: `
  if (memory.counter_name == 1) return 1;
  return 0;`
  },
  {
  script_label: "Randomizer",
  script_name: "randomizer",
  colour: "blue",
  script_function: `
  memory.randomizer = Math.random();
  console.log(memory.randomizer);
  if (memory.randomizer*100 > 50) return 1; // 20% chance
  return 0;`
  }
  ,
  {
  script_label: "Finish game",
  script_name: "game_finished",
  colour: "orange",
  script_function: `
  gameOver();
  return 1;`
  },
  {
  script_label: "Win game",
  script_name: "game_won",
  colour: "orange",
  script_function: `
  gameWon();
  return 1;`
  },
  {
  script_label: "Change score goal",
  script_name: "change_score_goal",
  colour: "orange",
  script_function: `
  final_score = 30;
  return 1;`
  }

];
let script_library_default_l = script_library_default.length;
let script_library = [];




  let script_decode_library = `[
    {
    script_name: "when_game_starts",
    script_function: function(){
      //alert("game started");
      return 1; //разобраться с хранением!!!!!!!!!!!!!!!
    }
    },
    {
    script_name: "if_score_is_7",
    script_function: function(){
      console.log("checked if score == 7");
      if (score == 7)
      return 1;
      return 0;
    }
    },
    {
    script_name: "when_snake_moves",
    script_function: function(){
      return 0;
    }
    },
    {
    script_name: "speed_double",
    script_function: function(){
      setSpeed( snake_speed /  2 );
      return 1;
    }
    }
  ];`;




document.getElementById('editor').innerhtml='';
document.getElementById('new_scripts').innerhtml='';
let new_scripts = document.getElementById('new_scripts');
let editor = document.getElementById('editor');
let x = 50;
let y = 20;
for (i = 0; i < y; i++)
{
  for (i0 = 0; i0 < x; i0++)
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

let edit_script_window_opened = 0;

function toggleEditScriptWindow(){
  let edit_script_window = document.getElementById("edit_script_window");
  if (edit_script_window_opened == 0)
  {
    edit_script_window.classList.remove("hidden");
    edit_script_window_opened = 1;
  }
  else
  {
    edit_script_window.classList.add("hidden");
    edit_script_window_opened = 0;
  }
}

let placed_scripts = [];
let placed_scripts_l;
let script_function;
let base_scripts_count = 1;
let colour;
let script_label;

  function addScript(script_name) {
    placed_scripts.push({ id: base_scripts_count, name: script_name, active: 0, completed: 0 });
    colour = "yellow";
    script_label = script_name;
    for (i = 0; i < script_library_default_l; i++ )
    {
      if (script_library_default[i].script_name == script_name)
      {
        script_label = script_library_default[i].script_label;
        script_function = script_library_default[i].script_function;
        colour = script_library_default[i].colour;
        break;
      }
    }
    celltext= "<div id='div" + base_scripts_count + "' class='script_itself " + colour + "' draggable='true' onclick='scriptClicked(" + base_scripts_count + ")' ondragstart='dragstart_handler(event)'>" + script_label + "<div class='script_edit'><div onclick='scriptEdit(" + base_scripts_count + ")' class='small_custom_button'>edit</div><div onclick='scriptRemove(" + base_scripts_count + ")' class='small_custom_button'>remove</div></div>   </div>";
    new_scripts.innerHTML+=celltext;
    toggleAddScriptMenu();
    script_library.push({ script_id: base_scripts_count, script_name: script_name, script_function: script_function});

    base_scripts_count++;
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
  // console.log(script_final_library);
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
let script_connections_l;

let found_similar_connection;
function connectScripts(from_id, to_id){
    found_similar_connection = 0;
    script_connections_l = script_connections.length;
    for (i = 0; i < script_connections_l; i++)
    {
      if (script_connections[i].from == from_id && script_connections[i].to == to_id)
      {
        found_similar_connection = 1;
        script_connections.splice(i, 1);
        break;
      }
    }
    if ( !found_similar_connection )
    script_connections.push({from: from_id, to: to_id});
    updateCanvasConnections();
}

function scriptRemove(id){
  console.log("trying to remove script " + id);
  placed_scripts_l = placed_scripts.length;
  // пройтись по списку скриптов и вырезать по совпадающему ID
  // пройтись по списку связей и едалить все, упоминающие ID
  for (i = 0; i < placed_scripts_l; i++)
  {
    if (placed_scripts[i].id == id)
    {
      placed_scripts.splice(i, 1);
      break;
    }
  }
  // console.log("script_connections_l = " + script_connections_l);
  // console.log(script_connections);
  for (i = 0; i < script_connections.length; i++)
  {
    if (script_connections[i].from == id || script_connections[i].to == id)
    {
      script_connections.splice(i, 1);
      i--;
    }
  }
  let elem = document.querySelector("#div"+id);
  elem.remove();
  console.log("removed script " + id + " and its connections");
  updateCanvasConnections();
}

let edited_script;
let script_code_area;
function scriptEdit(id){
  edited_script = id;
  script_code_area = document.getElementById("script_code");
  script_code_area.value = script_library[edited_script-1].script_function;
  console.log("trying to edit script " + id);

  toggleEditScriptWindow();
}

function saveEditedScript(){
  script_code_area = document.getElementById("script_code");
  script_library[edited_script-1].script_function = script_code_area.value;
  toggleEditScriptWindow();
}

let canvas = document.getElementById('connections');
let ctx = canvas.getContext('2d');
//ctx.fillStyle = 'rgb(200, 0, 0)';

//let shit = 1;

function updateCanvasConnections(){
  script_connections_l = script_connections.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < script_connections_l; i++)
  {
    let x1,y1,x2,y2,obj1,obj2;
    obj1 = document.getElementById("div"+script_connections[i].from);
    obj2 = document.getElementById("div"+script_connections[i].to);
    x1 = obj1.offsetLeft;
    y1 = obj1.offsetTop;
    x2 = obj2.offsetLeft;
    y2 = obj2.offsetTop;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 8;
    //script size 30 * 150
    let script_width = 216, script_height = 76;

    y1 += script_height/2;
    y2 += script_height/2;
    x1 += script_width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    if (x1 != x2 && y1 != y2)
    {
      ctx.bezierCurveTo(x1 + Math.abs(x1 - x2) / 2, y1, x2 - + Math.abs(x1 - x2) / 2, y2, x2, y2);
    }
    else
    {
      ctx.bezierCurveTo(x1 + script_height*2, y1, x1 + script_height*2, y1 + script_height*2, (x1 + x2)/2 , y1 + script_height*2);
      ctx.bezierCurveTo(x2 - script_height*2, y1 + script_height*2, x2 - script_height*2, y1, x2 , y2);
    }
    ctx.moveTo(x2 - script_height/3, y2 - script_height/3);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - script_height/3, y2 + script_height/3);

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
    // console.log(script_library);
  }


  //shit++;
}

//console.log(script_decode_library);
function startGame(){

  let script_library_l = script_library.length;
  let script_final_library = ``;
  script_final_library += `[`;
  for (i = 0; i < script_library_l; i++)
  {
    script_final_library += `{
    script_id: "` + script_library[i].script_id + `",
    script_function: function(){` + script_library[i].script_function + `
    }
    }`;
    if (i != script_library_l - 1) script_final_library += ',';
  }
  script_final_library += `]`;
  // console.log(script_final_library);

  sessionStorage.setItem("connections", JSON.stringify(script_connections));
  sessionStorage.setItem("scripts", JSON.stringify(placed_scripts));
  sessionStorage.setItem("library", script_final_library);

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
