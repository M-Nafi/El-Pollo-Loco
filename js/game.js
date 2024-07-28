let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;

function handleGameOver() {
  gameOver = true;
}

/**
 * initializes world and starts the game
 */
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

/**
 * restarts the game and show relevant elements
 */
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

/**
 * sets up mobile game controls
 */
function mobileGameControl() {
  let controlIcons = document.getElementById('mobile_view');
  controlIcons.classList.remove('d-none');

  document.getElementById('move_left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('move_left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('move_right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('move_right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true; 
  });

  document.getElementById('jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false; 
  });

  document.getElementById('throw_bottle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true; 
  });

  document.getElementById('throw_bottle').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false; 
  });
}

/**
 * sets up keyboard controls for desktop
 */
window.addEventListener('keydown', (e) => {  
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

/**
 * sets up game sound control in total for muting and unmuting
 */
function setupSoundControl() {
  let soundOffIcon = document.getElementById('sound_off');
  let soundOnIcon = document.getElementById('sound_on');
  let isMuted = true; 
  let allAudios = [];
  let registerAudio = audio => {
    allAudios.push(audio);
    audio.muted = isMuted;
  };
  let toggleMute = () => {
    isMuted = !isMuted;
    allAudios.forEach(audio => audio.muted = isMuted);
    soundOffIcon.classList.toggle('d-none', !isMuted);
    soundOnIcon.classList.toggle('d-none', isMuted);
  };

  [soundOffIcon, soundOnIcon].forEach(icon => icon.addEventListener('click', toggleMute));
  window.registerAudio = registerAudio;
  window.isMuted = () => isMuted;  
  soundOffIcon.classList.remove('d-none');
  soundOnIcon.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
  setupSoundControl();
});
