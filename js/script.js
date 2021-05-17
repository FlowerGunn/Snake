let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');
//field.setAttribute(‘id’, ‘field’);
//field.style.background = "blue";
let final_score = 15;
let interval;
let memory = new Object();

for(let i=1; i<170; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 13;

for (let i=0; i<excel.length; i++){
    if (x > 13){
        x = 1; y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;

}

function generateSnake(){
    let posX = Math.round(Math.random() * (13 - 3) + 3);
    let posY = Math.round(Math.random() * (13 - 1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' +
 coordinates[1] + '"]') , document.querySelector('[posX = "' + (coordinates[0]-1)+ '"][posY = "' +
 coordinates[1] + '"]') , document.querySelector('[posX = "' + (coordinates[0]-2)+ '"][posY = "' +
 coordinates[1] + '"]') ];

 for (let i = 0; i<snakeBody.length; i++){
     snakeBody[i].classList.add('snakeBody');
 }

 snakeBody[0].classList.add('head');


 let food;
 function createFood(){
    function generateFood(){
        let posX = Math.round(Math.random() * (13 - 3) + 3);
        let posY = Math.round(Math.random() * (13 - 1) + 1);
        return [posX, posY];
    }
    let foodCoordinates = generateFood();

    food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]');

    while(food.classList.contains('snakeBody')) {
        let foodCoordinates = generateFood();
        food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]');
     }

    food.classList.add('food');
 }
 createFood();

function gameWon(){
  clearInterval(interval);
  setTimeout(() => {
    alert(` Вы победили! Ваши очки : ${score}`);
  }, 200);
}

function gameOver(){
  clearInterval(interval);
  setTimeout(() => {
    alert(`Игра окончена. Ваши очки : ${score}`);
  }, 200);
}

let direction = 'right';
let steps = false;

let score = 0;

function move(){
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
  snakeBody[0].classList.remove('head');
  snakeBody[snakeBody.length-1].classList.remove('snakeBody');
  snakeBody.pop();

    if (direction == 'right') {
      if (snakeCoordinates[0]< 13){
         snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0] + 1 )+ '"][posY = "' + snakeCoordinates[1] + '"]'));
        }
      else {
         snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    }

     else if (direction == 'left') {
        if (snakeCoordinates[0]> 1){
           snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0] - 1 )+ '"][posY = "' + snakeCoordinates[1] + '"]'));
          }
        else {
           snakeBody.unshift(document.querySelector('[posX = "13"][posY = "' + snakeCoordinates[1] + '"]'));
          }
      }

      else if (direction == 'up') {
        if (snakeCoordinates[1] < 13){
           snakeBody.unshift(document.querySelector('[posX = "' +  snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1 )+ '"]'));
          }
        else {
           snakeBody.unshift(document.querySelector('[posX = "' +  snakeCoordinates[0] + '"][posY = "1"]'));
          }
      }

      else if (direction == 'down') {
        if (snakeCoordinates[1] > 1){
           snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1 )+ '"]'));
          }
        else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "13"]'));
        }
      }
      completeEvents("when_snake_moves");

      scoreBlock = document.querySelector(" h2 span ");

   if( snakeBody[0].getAttribute('posX') == food.getAttribute('posX')
        && snakeBody[0].getAttribute('posY') == food.getAttribute('posY')) {
     completeEvents("when_snake_eats");
     food.classList.remove('food');
     let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
     let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
     snakeBody.push(document.querySelector('[posX = "' +  a + '"][posY = "' + b + '"]'))
     createFood();
     completeEvents("when_food_spawns");
     score++;
     scoreBlock.innerText = + scoreBlock.innerText +1;
    }

    if(snakeBody[0].classList.contains('snakeBody')){
      gameOver();

      clearInterval(interval);
      //snakeBody[0].style.backgound = ' #0a0a0a ';
      //snakeBody[0].style.backgoundSize = "cover";
    }
    if(score == final_score ){
      gameWon();

      clearInterval(interval);
      //snakeBody[0].style.backgound = ' #0a0a0a ';
      //snakeBody[0].style.backgoundSize = "cover";
    }

  snakeBody[0].classList.add('head');
  for (let i = 0; i<snakeBody.length; i++){
     snakeBody[i].classList.add('snakeBody');
    }
    steps = true;
}

 window.addEventListener('keydown', function (e) {
   if ( steps == true ){
  if(e.keyCode == 37 && direction != 'right'){
    direction = 'left';
    steps = false;
  }else if(e.keyCode == 38 && direction != 'down')
    {direction = 'up';
    steps = false;
  }else if(e.keyCode == 39 && direction != 'left')
   { direction = 'right';
   steps = false;
  }else if(e.keyCode == 40 && direction != 'up')
    {direction = 'down';
    steps = false;}
  }
}
);

let snake_interval = 370;
interval = setInterval(move, snake_interval);



function setSpeed(speed){
  clearInterval(interval);
  interval = setInterval(move,speed);
}

//loading scripts ...

let connections = JSON.parse(sessionStorage.getItem("connections"));
let scripts = JSON.parse(sessionStorage.getItem("scripts"));
let script_library = sessionStorage.getItem("library");
console.log(script_library);
eval("script_library = " + script_library);
console.log(script_library);

//alert(connections.length);

//enter meditative state

//найти скрипты которые требуют начало игры - активировать

// let script_decode_library = [
//   {
//   script_name: "when_game_starts",
//   script_function: function(){
//     //alert("game started");
//     return 0; //разобраться с хранением!!!!!!!!!!!!!!!
//   }
//   },
//   {
//   script_name: "if_score_is_7",
//   script_function: function(){
//     console.log("checked if score == 7");
//     if (score == 7)
//     return 1;
//     return 0;
//   }
//   },
//   {
//   script_name: "when_snake_moves",
//   script_function: function(){
//     return 0;
//   }
//   },
//   {
//   script_name: "speed_double",
//   script_function: function(){
//     setSpeed( snake_speed /  2 );
//     return 1;
//   }
//   }
// ];

let scripts_l;
if (scripts != null) scripts_l = scripts.length;
let i0, i1, i2, i3;
let connections_l;
if (connections != null) connections_l = connections.length;
let has_parent;

//активировать все события, у которых нет родителей
// for (i0 = 0; i0 < scripts_l; i0++)
// {
//   has_parent = 0;
//   for (i1 = 0; i1 < connections_l; i1++)
//   {
//     if (connections[i1].to == scripts[i0].id)
//     {
//       has_parent = 1;
//       break;
//     }
//   }
//   if (has_parent == 0)
//   {
//     scripts[i0].active = 1;
//   }
// }



function completeEvents(script_name){
  for (i0 = 0; i0 < scripts_l; i0++)
  {
    if (scripts[i0].name == script_name && scripts[i0].active == 1)
    {
      scripts[i0].completed == 1;
    }
  }
}


function activateEvents(script_name){
  for (i0 = 0; i0 < scripts_l; i0++)
  {
    if (scripts[i0].name == script_name)
    {
      scripts[i0].active = 1;
    }
  }
}

activateEvents("when_game_starts");
completeEvents("when_game_starts");

//find a function from a script script_name
let script_library_l;
if (script_library != null) script_library_l = script_library.length;
// function scriptNameToFunction(script_name){
//   for (i3 = 0; i3 < script_library_l; i3++)
//   {
//     //console.log(script_name + "         " + script_library[i3].script_name);
//     //console.log(script_library);
//     if (script_name == script_library[i3].script_name) return i3;
//   }
//   return -1;
// }

function scriptIdToFunction(script_id){
  for (i3 = 0; i3 < script_library_l; i3++)
  {
    // console.log(script_id + "         " + script_library[i3].script_id);
    // console.log(script_library);
    if (script_id == script_library[i3].script_id) return i3;
  }
  return -1;
}

let result, function_id;
let update_scripts_interval;
if (scripts != null) update_scripts_interval = setInterval(updateScripts, 250);

function updateScripts(){
  //пройтись по каждому скрипту
  //скрипт может быть активен или неактивен и может быть оконченым или неоконченым
  //ЕСЛИ СКРИПТ АКТИВЕН
  //запускаем функцию соответсвующую скрипту и получаем ответ. в зависимости от ответа ОКАНЧИВАЕМ скрипт
  //ЕСЛИ СКРИПТ ОКОНЧЕН
  //активируем всех потомков

  for (i0 = 0; i0 < scripts_l; i0++)
  {
    //alert("active       " + scripts[i0].active);
    if (scripts[i0].active == 1)
    {
      function_id = scriptIdToFunction(scripts[i0].id);
      console.log(scripts[i0].name + "     " + function_id);
      if (function_id == -1) break;
      result = script_library[function_id].script_function();
      // console.log(result);
      if (result == 1)
      {
        scripts[i0].active = 0;
        scripts[i0].completed = 1;
        console.log("completed a script");
      }
      else if (result == -1) scripts[i0].active = 0;
    }

    if (scripts[i0].completed == 1)
    {
      console.log("found completed script");
      for (i1 = 0; i1 < connections_l; i1++)
      {
        if (connections[i1].from == scripts[i0].id)
        {
          //find a script with id X and make it active
          for (i2 = 0; i2 < scripts_l; i2++)
          {
            if (scripts[i2].id == connections[i1].to)
            {
              console.log("found a relative");
              scripts[i2].active = 1;
              break;
            }
          }
        }
      }
      scripts[i0].completed = 0;
    }
  }
}
