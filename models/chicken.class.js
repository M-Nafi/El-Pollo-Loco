class Chicken extends MovableObject {
  y = 348;
  height = 70;
  width = 65;
  isDead = false;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 750 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.35;
    this.applyGravity();
    this.animate();
  }

  /**
   * applies gravity to the object by adjusting its y position and velocity
   *
   * @memberof Chicken
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 348;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * checks if the object is above the ground
   *
   * @returns {boolean} true if above the ground, false otherwise
   */
  isAboveGround() {
    return this.y < 348;
  }

  /**
   * handles animation and movement of the chicken
   *
   * @memberof Chicken
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);

    setInterval(() => {
      if (!this.isDead) {
        this.jump();
      }
    }, 3000 + Math.random() * 2000);
  }

  /**
   * makes the chicken jump by setting a random upward speed
   *
   * @memberof Chicken
   */
  jump() {
    this.speedY = 2 + Math.random() * 10;
  }
}
