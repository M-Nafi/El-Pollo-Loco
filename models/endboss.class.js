class Endboss extends MovableObject {
  height = 250;
  width = 250;
  y = 185;
  isDead = false;
  endBossKilled_sound = new Audio('audio/endbossKilled.mp3');
  win_sound = new Audio('audio/win.mp3');

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  IMAGES_GAMEOVER = [
    'img/9_intro_outro_screens/win/win_1.png',
    'img/9_intro_outro_screens/win/win_2.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_GAMEOVER);
    this.x = 2600;
    this.animate();
    this.speed = 2.5;
    this.registerAndMuteAudio(this.endBossKilled_sound);
    this.registerAndMuteAudio(this.win_sound);
  }

  /**
   * increases the object's speed by a factor of 1.75
   *
   * @memberof Endboss
   */
  increaseSpeed() {
    this.speed *= 2.1;
  }

  /**
   * handles animation of the object, alternating between alert, walk, and dead animations
   * the method runs at intervals and stops if the object is dead
   *
   * @memberof Endboss
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.alertAnimation();
        this.walkAnimation();
      } else {
        this.deadAnimation();
        setTimeout(() => {
          clearInterval(this.animationInterval);
        }, 2100);
      }
    }, 275);
  }

  /**
   * plays the alert animation and triggers movement and attack after a delay
   *
   * @memberof Endboss
   */
  alertAnimation() {
    this.playAnimation(this.IMAGES_ALERT);
    setTimeout(() => {
      this.moveLeftAndAttack();
    }, 700);
  }

  /**
   * plays the walking animation for the object
   *
   * @memberof Endboss
   */
  walkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * plays the hurt animation and plays the end boss killed sound
   *
   * @memberof Endboss
   */
  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.endBossKilled_sound.play();
  }

  /**
   * plays the dead animation and plays the end boss killed sound
   *
   * @memberof Endboss
   */
  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.endBossKilled_sound.play();
  }

  /**
   * moves the object to the left by its speed value
   *
   * @memberof Endboss
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * moves the object to the left and plays the attack animation
   *
   * @memberof Endboss
   */
  moveLeftAndAttack() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * defines the offset values for the object
   *
   *
   * @memberof Endboss
   */
  offset = {
    top: 45,
    right: 40,
    bottom: 60,
    left: 45,
  };

  /**
   * handles the death of the endboss
   * sets the game to over. hides initial elements. starts the endboss death sequence
   *
   * @memberof Endboss
   */
  handleEndbossIsDeath() {
    this.gameOver = true;
    this.hideInitialElements();
    this.startEndbossDeathSequence();   
  }

  /**
   * hides initial elmeents when the endboss dies
   * includes hiding the mobile view bottom and the main font
   *
   * @memberof Endboss
   */
  hideInitialElements() {
    document.getElementById('mobile_view').style.display = 'none';
    document.getElementById('main_font').style.display = 'none';
  }

  /**
   * starts sequence of events that occur when the endboss dies
   * hiding canvas and game introducing elements
   * showing the restart game button and the win image. playing the win sound
   *
   * @memberof Endboss
   */
  startEndbossDeathSequence() {
    gameOver = true;
    let winImage2 = document.getElementById('win_img_2');
    setTimeout(() => {
      document.querySelector('canvas').style.display = 'none';
      document.getElementById('game_introducing').style.display = 'none';      
      winImage2.classList.remove('d-none');
      document.getElementById('restart_game').classList.remove('d-none');
      this.win_sound.play();
    }, 3000);
  }
}
