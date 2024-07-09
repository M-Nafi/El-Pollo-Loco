class Endboss extends MovableObject {
  height = 250;
  width = 250;
  y = 185;
  isDead = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2600;
    this.animate();
    this.visibleHeight = 210;
    this.visibleWidth = 235;
    this.speed = 2.5;
  }

  animate() {
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.alertAnimation();
        this.walkAnimation();
        this.moveLeft();
      } else {
        this.deadAnimation();
        setTimeout(() => {
          clearInterval(this.animationInterval);
        }, 3000);
      }
    }, 550);
  }

  alertAnimation() {
    this.playAnimation(this.IMAGES_ALERT);
    setTimeout(() => {
      this.moveLeftAndAttack();
    }, 750);
  }

  walkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveLeftAndAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
  }
}
