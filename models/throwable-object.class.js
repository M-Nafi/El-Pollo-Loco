class ThrowableObject extends MovableObject {
  hasHit = false;

  BOTTLE_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.BOTTLE_ROTATION);
    this.loadImages(this.BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.world = world;
    this.throw();
  }

  /**
   * starts the throw action and sets up the interval
   *
   * @memberof ThrowableObject
   */
  throw() {
    this.speedY = 22;
    this.applyGravity();
    let direction;
    if (this.world.character.otherDirection) {
      direction = -1;
    } else {
      direction = 1;
    }
    this.startThrowInterval(direction);
  }

  /**
   * sets up the interval for the throw action
   *
   * @param {number} direction
   * @memberof ThrowableObject
   */
  startThrowInterval(direction) {
    this.throwInterval = setInterval(() => {
      this.x += 13 * direction;
      this.playAnimation(this.BOTTLE_ROTATION);
      if (this.y >= 370) {
        this.playSplashAnimation();
        this.stopGravity();
        clearInterval(this.throwInterval);
      }
    }, 50);
  }

  /**
   * plays splash animation and then deletes the object from the game
   *
   * @memberof ThrowableObject
   */
  playSplashAnimation() {
    this.playAnimation(this.BOTTLE_SPLASH);
    setTimeout(() => {
      this.deleteFromGame();
    }, 700);
  }

  /**
   * stops the gravity effect on the object
   *
   * @memberof ThrowableObject
   */
  stopGravity() {
    this.speedY = 0;
    this.acceleration = 0;
  }

  /**
   * removes the object from the game by setting its width to 0
   *
   * @memberof ThrowableObject
   */
  deleteFromGame() {
    this.width = 0;
  }
}
