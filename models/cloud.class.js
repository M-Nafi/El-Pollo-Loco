class Cloud extends MovableObject {
  y = 30;
  height = 200;
  width = 2200;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/full.png');
    this.x = Math.random() * 1440;
    // console.log('wolke kreirt bei x:', this.x);
    this.animate();
  }

  animate() {
    // console.log('animation wird aufgerufen');
    this.moveLeft();
    requestAnimationFrame(() => this.animate());  // ? call fragen!
  }
}
