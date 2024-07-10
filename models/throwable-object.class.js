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
    this.throw();
  }

  throw() {
    this.speedY = 22;
    this.applyGravity();

    this.throwInterval = setInterval(() => {
      this.x += 13;
      this.playAnimation(this.BOTTLE_ROTATION);
      if (this.y >= 370) {  // bei ca 350 ist flasche optisch am boden evtl anpassen
        this.playSplashAnimation();
        this.stopGravity();
        clearInterval(this.throwInterval);
      }
    }, 50);
  }

  playSplashAnimation() {
    this.playAnimation(this.BOTTLE_SPLASH);
    setTimeout(() => {
      this.deleteFromGame();
    }, 150);
  }

  stopGravity() {
    this.speedY = 0;
    this.acceleration = 0;
  }

  deleteFromGame() {
    this.width = 0;
  }
}
