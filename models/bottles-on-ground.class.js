class Bottles extends MovableObject {
  height = 60;
  width = 50;
  // x = 300;
  y = 360;


  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
   
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 200 + Math.random() * 2000;
    this.bottlesOnGround();
  }

  bottlesOnGround() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 500);
  }
}





// for (let i = 0; i < 5; i++) {
//   const bottle = new Bottles(startX + i * 100, startY); // Abstand zwischen den Flaschen: 100 Pixel
//   bottlesArray.push(bottle);
// }
