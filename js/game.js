// let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;

// function init() {  
//   // document.querySelector("canvas").style.display = "none";
//   // canvas = document.getElementById('canvas');
//   // world = new World(canvas, keyboard);
//   // startScreen.classList.add('d-none'); 
//   // canvas.classList.remove('d-none');      
// }

function startGame() {
  canvas = document.getElementById('canvas');
  startScreen = document.getElementById('start_screen'); 

  if (canvas && startScreen) {
    world = new World(canvas, keyboard);
    startScreen.classList.add('d-none');  
    canvas.classList.remove('d-none');    
  } 
}

function restartGame() {
  let canvas = document.querySelector("canvas");
  let gameOverImage2 = document.getElementById("game_over_img_2");
  let gameIntroducing = document.getElementById("game_introducing");
  let restartGame = document.getElementById("restart_game");

  canvas.style.display = "";  
  gameOverImage2.classList.add("d-none");  
  gameIntroducing.style.display = "";  
  restartGame.classList.add("d-none");  
  location.reload(); 
}

window.addEventListener('keydown', (e) => {
  // console.log(e.keyCode);  // hiermit kann man tastencode auslesen in der konsole 
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if(e.keyCode == 68) {
      keyboard.D = true;
  } 
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if(e.keyCode == 68) {
      keyboard.D = false;
  } 
});