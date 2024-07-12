class Cloud extends MovableObject {
  y = 30;
  height = 200;
  width = 2200;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/full.png');
    this.x = Math.random() * 1440;   
    this.animate();
  }

  animate() {   
    this.moveLeft();
    requestAnimationFrame(() => this.animate());  // ? call fragen!
  }
}
