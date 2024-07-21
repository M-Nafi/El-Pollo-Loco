class StatusbarEndboss extends DrawableObject {
  percentage = 100;

  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 7;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * sets the percentage of the endboss health and updates the status bar image
   * pauses the game sound if the percentage drops to 0 or below
   *
   * @param {number} percentage - the percentage of the endboss's health
   * @memberof StatusbarEndboss
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
    if (percentage <= 0) {
      this.world.game_sound.pause();
    }
  }

  /**
   * determines the index of the image based on the current percentage
   *
   * @returns {number} the index of the image in the images array
   * @memberof StatusbarEndboss
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
