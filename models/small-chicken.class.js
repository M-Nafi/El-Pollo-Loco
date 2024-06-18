class smallChicken extends MovableObject {
  y = 375; 
  height = 40; 
  width = 45;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 1700; // startposition 500px und 
    this.speed = 0.17 + Math.random() * 0.45;
    this.applyGravity();
    this.animate();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 375; // setzten der höhe wieder auf die ursprüngliche position
        this.speedY = 0; // stoppt die bewegung nach unten
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 375;  // 375 notwendig da mov.obj anders und chicken sonst auf anderer höhe.
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);    
    setInterval(() => {
      this.jump();
    }, 3000 + Math.random() * 2000); // zufällig springen evtl anpassen
  }

  jump() {
    this.speedY = 5 + Math.random() * 10; // höhe des zufälligen sprungs evtl anpassen
  }
}
