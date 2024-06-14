class Cloud extends MovableObject {
  y = 20;
  height = 200;
  width = 2200;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/full.png');
    this.x = Math.random() * 719*2;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
