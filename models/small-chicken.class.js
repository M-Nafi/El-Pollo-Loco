class smallChicken extends MovableObject {
  y = 375;
  height = 40;
  width = 45;
  isDead = false;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 750 + Math.random() * 2000;
    this.speed = 0.17 + Math.random() * 0.45;
    this.applyGravity();
    this.animate();
  }

  /**
   * applies gravity to the object, adjusting its y position and velocity
   *
   * @memberof smallChicken
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 375; 
        this.speedY = 0; 
      }
    }, 1000 / 25);
  }

  /**
   * checks if the object is above the ground
   *
   * @returns {boolean}
   * @memberof smallChicken
   */
  isAboveGround() {
    return this.y < 375;
  }

  /**
   * handles the animation of the object, including movement, walking, and jumping
   *
   * @memberof smallChicken
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
   * sets the object's vertical speed to jump
   *
   * @memberof smallChicken
   */
  jump() {
    this.speedY = 6 + Math.random() * 10;
  }
}
