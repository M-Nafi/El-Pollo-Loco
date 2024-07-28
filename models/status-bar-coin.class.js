class StatusbarCoin extends DrawableObject {
  percentage = 0;

  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 45;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * sets the percentage of collected coins and updates the status bar image
   *
   * @param {number} percentage 
   * @memberof StatusbarCoin
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * determines the index of the image based on the current percentage
   *
   * @returns {number} 
   * @memberof StatusbarCoin
   */
  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0;
    } else if (this.percentage > 0 && this.percentage <= 20) {
      return 1;
    } else if (this.percentage > 20 && this.percentage <= 40) {
      return 2;
    } else if (this.percentage > 40 && this.percentage <= 60) {
      return 3;
    } else if (this.percentage > 60 && this.percentage <= 80) {
      return 4;
    } else {
      return 5;
    }
  }
}
