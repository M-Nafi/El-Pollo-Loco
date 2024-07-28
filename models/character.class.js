class Character extends MovableObject {
  speed = 5;
  y = 55;
  world;
  walking_sound = new Audio('audio/running.mp3');
  jumping_sound = new Audio('audio/jump.mp3');
  hitted_sound = new Audio('audio/hitted.mp3');
  snoring_sound = new Audio('audio/snoring.mp3');
  gameover_sound = new Audio('audio/gameover.mp3');
  lastMoveTime = new Date().getTime(); // erfassung letzte bewegung

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  IMAGES_LONGIDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_GAMEOVER = [
    'img/9_intro_outro_screens/game_over/oh no you lost!.png',
    'img/9_intro_outro_screens/game_over/game over!.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_GAMEOVER);
    this.animate();
    this.applyGravity();
    this.longIdle();
    this.registerAndMuteAudio(this.walking_sound);
    this.registerAndMuteAudio(this.jumping_sound);
    this.registerAndMuteAudio(this.hitted_sound);
    this.registerAndMuteAudio(this.snoring_sound);
    this.registerAndMuteAudio(this.gameover_sound);
  }

  /**
   * starts animation loops for movement, jumping, camera updates, and character animations
   * 
   * @memberOf Character
   */
  animate() {
    setInterval(() => {
      this.handleCharacterMove();
      this.handleCharacterJump();
      this.updateCamera();
    }, 1000 / 60);
    setInterval(() => {
      this.updateCharacterAnimations();
    }, 50);
  }

  /**
   * handles character movement based on using keyboard and plays the walking sound
   * 
   * @memberOf Character
   */
  handleCharacterMove() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) this.walking_sound.play();
      this.lastMoveTime = new Date().getTime();
    } else if (this.world.keyboard.LEFT && this.x > -500) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround()) this.walking_sound.play();
      this.lastMoveTime = new Date().getTime();
    } else {
      this.walking_sound.pause();
    }
  }

  /**
   * handles character jumping based on using keyboard and plays the jumping sound
   * 
   * @memberOf Character
   */
  handleCharacterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.walking_sound.pause();
      this.jumping_sound.play();
      this.lastMoveTime = new Date().getTime();
    }
  }

  /**
   * updates the camera position based on the character's x position
   * 
   * @memberOf Character
   */
  updateCamera() {
    this.world.camera_x = -this.x + 75;
  }

  /**
   * updates character animations based on its current state if dead, hurt, jumping or walking
   * 
   * @memberOf Character
   */
  updateCharacterAnimations() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hitted_sound.play();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  /**
   * manages the long idle animation and plays the snoring sound if the character is idle for 3 sekonds
   * 
   * @memberOf Character
   */
  longIdle() {
    setInterval(() => {
      let currentTime = new Date().getTime();
      if (currentTime - this.lastMoveTime > 3000 && !this.isDead() && !gameOver) {
        this.playLongIdleAnimation();
        this.snoring_sound.play();
      } else {
        this.snoring_sound.pause();
      }
    }, 1500);
  }

  /**
   * plays the long idle animation when the character is idle for an extended period
   * 
   * @memberOf Character
   */
  playLongIdleAnimation() {
    let longIdleInterval = setInterval(() => {
      if (this.world.keyboard.LEFT ||
          this.world.keyboard.RIGHT ||
          this.world.keyboard.SPACE ||
          this.world.keyboard.D) {
        clearInterval(longIdleInterval);
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.snoring_sound.pause();
        this.lastMoveTime = new Date().getTime();
        return;
      }
      this.playAnimation(this.IMAGES_LONGIDLE);
    }, 1000);
  }

  /**
   * defines the offset values for the object
   *
   * @memberof Character
   */
  offset = {
    top: 120,
    right: 20,
    bottom: 7,
    left: 20,
  };

  /**
   * handles gameover sequence including hiding game elements and displaying gameover images
   * @memberOf Character
   */
  handlePepeIsDeath() {
    gameOver = true;
    this.hideGameElements();
    this.showGameOverImages();
    this.handleGameOverSound();
  }

  /**
   * hides the game elements and displays the initial gameover screen elements
   * 
   * @memberOf Character
   */
  hideGameElements() {
    setTimeout(() => {
      document.querySelector('canvas').style.display = 'none';
      document.getElementById('game_introducing').style.display = 'none';
      document.getElementById('restart_game').classList.remove('d-none');
      document.getElementById('game_over_img_1').classList.remove('d-none');
      document.getElementById('main_font').style.display = 'none';
    }, 3000);
  }

  /**
   * displays gameover image and hides the first one
   * 
   * @memberOf Character
   */
  showGameOverImages() {
    setTimeout(() => {
      document.getElementById('game_over_img_2').classList.remove('d-none');
      document.getElementById('game_over_img_1').style.display = 'none';
    }, 5000);
  }

  /**
   * plays and then stops the gameover sound
   * 
   * @memberOf Character
   */
  handleGameOverSound() {
    this.gameover_sound.play();
    setTimeout(() => {
      if (!this.gameover_sound.paused) {
        this.gameover_sound.pause();
        this.gameover_sound.currentTime = 0;
      }
    }, 6000);
  }
}
