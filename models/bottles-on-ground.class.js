class Bottles extends MovableObject {
  height = 60;
  width = 50;
  y = 360;
  collectedBottles_sound = new Audio('audio/bottleCollect.mp3');

  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 200 + Math.random() * 2000;
    this.bottlesOnGround();
    this.registerAndMuteAudio(this.collectedBottles_sound);
  }

  /**
   * starts the animation for the bottles on ground
   */
  bottlesOnGround() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 500);
  }
}