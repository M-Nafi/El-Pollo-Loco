let canvas;
let world;
let keyboard = new Keyboard();

function init() {  
  // document.querySelector("canvas").style.display = "none";
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);  
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