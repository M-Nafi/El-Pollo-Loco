let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;

function startGame() {
  canvas = document.getElementById('canvas');
  startScreen = document.getElementById('start_screen');
  mainFont = document.getElementById('main_font');
  if (canvas && startScreen) {
    startLevel();
    world = new World(canvas, keyboard);
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    mainFont.classList.remove('d-none');
    mobileGameControl();   
  }
}

function restartGame() {
  let canvas = document.querySelector('canvas');
  let gameOverImage2 = document.getElementById('game_over_img_2');
  let gameIntroducing = document.getElementById('game_introducing');
  let restartGame = document.getElementById('restart_game');

  canvas.style.display = '';
  gameOverImage2.classList.add('d-none');
  gameIntroducing.style.display = '';
  restartGame.classList.add('d-none');
  location.reload();
  mobileGameControl();
}

function mobileGameControl() {
  let controlIcons = document.getElementById('mobile_view');
  controlIcons.classList.remove('d-none');
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
  if (e.keyCode == 68) {
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
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

// funktion für sound control. muten entmuten 
document.addEventListener('DOMContentLoaded', () => {
  let soundOffIcon = document.getElementById('sound_off');
  let soundOnIcon = document.getElementById('sound_on');
  let isMuted = false;
  let allAudios = [];

  let registerAudio = audio => {
      allAudios.push(audio);
      audio.muted = isMuted;
  };

  let toggleMute = () => {
      isMuted = !isMuted;
      allAudios.forEach(audio => audio.muted = isMuted);
      soundOffIcon.classList.toggle('d-none', isMuted);
      soundOnIcon.classList.toggle('d-none', !isMuted);
  };

  [soundOffIcon, soundOnIcon].forEach(icon => icon.addEventListener('click', toggleMute));
  window.registerAudio = registerAudio;
  window.isMuted = () => isMuted;
});