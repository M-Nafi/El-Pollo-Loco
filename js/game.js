let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;

/**
 * sets the gameover (boolean-flag) to true
 */
function handleGameOver() {
  gameOver = true;
}

/**
 * initializes world and starts the game
 */
function startGame() {
  gameOverImage2 = document.getElementById('game_over_img_2');
  canvas = document.getElementById('canvas');
  startScreen = document.getElementById('start_screen');
  mainFont = document.getElementById('main_font');
  if (canvas && startScreen) {
    startLevel();
    gameOverImage2.classList.add('d-none');
    world = new World(canvas, keyboard);
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    mainFont.classList.remove('d-none');
    mobGameCntrlLeftHand();
    mobGameCntrlRightHand();
  }
}

/**
 * restarts the game by hiding game over images. stopping all active intervals
 * resetting canvas and mobile controls, and then starting the game again
 */
function restartGame() {
  document.getElementById('game_over_img_1').classList.add('d-none');
  document.getElementById('game_over_img_2').classList.add('d-none');
  document.getElementById('win_img_2').classList.add('d-none');
  stopGame();
  canvas = document.getElementById('canvas');
  document.getElementById('canvas').style.display = '';
  document.getElementById('mobile_view').style.display = '';
  document.getElementById('restart_game').classList.add('d-none');
  mobGameCntrlLeftHand();
  mobGameCntrlRightHand();
  startGame();
}

/**
 * stops all active intervals by clearing interval ids
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * resets game state and displays relevant elements
 * reloads the page to reset the game state
 */
function backToMenu() {
  document.getElementById('canvas').style.display = '';
  document.getElementById('game_over_img_2').classList.add('d-none');
  document.getElementById('game_introducing').style.display = '';
  document.getElementById('restart_game').classList.add('d-none');
  location.reload();
}

/**
 * displays mobile control icons by removing the d-none class
 */
function definitionOfControlIcons() {
  let controlIcons = document.getElementById('mobile_view');
  controlIcons.classList.remove('d-none');
}

/**
 * sets up mobile game controls left hand side
 */
function mobGameCntrlLeftHand() {
  definitionOfControlIcons();

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
}

/**
 * sets up mobile game controls right hand side
 */
function mobGameCntrlRightHand() {
  definitionOfControlIcons();

  document.getElementById('jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
  document
    .getElementById('throw_bottle')
    .addEventListener('touchstart', (e) => {
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
  let registerAudio = (audio) => {
    allAudios.push(audio);
    audio.muted = isMuted;
  };
  let toggleMute = () => {
    isMuted = !isMuted;
    allAudios.forEach((audio) => (audio.muted = isMuted));
    soundOffIcon.classList.toggle('d-none', !isMuted);
    soundOnIcon.classList.toggle('d-none', isMuted);
  };

  [soundOffIcon, soundOnIcon].forEach((icon) =>
    icon.addEventListener('click', toggleMute)
  );
  window.registerAudio = registerAudio;
  window.isMuted = () => isMuted;
  soundOffIcon.classList.remove('d-none');
  soundOnIcon.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
  setupSoundControl();
});
