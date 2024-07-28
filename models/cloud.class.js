class Cloud extends MovableObject {
  y = 30;
  height = 200;
  width = 2200;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/full.png');
    this.x = Math.random() * 1440;
    this.animate();
  }
  
  /**
   * continuously moves the object to the left and calls itself on the next animation frame
   *
   * @memberof Cloud
   */
  animate() {
    this.moveLeft();
    requestAnimationFrame(() => this.animate());
  }
}
