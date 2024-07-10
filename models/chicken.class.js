class Chicken extends MovableObject {
  y = 348; 
  height = 70; 
  width = 65;
  isDead = false; 


  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 1700;   
    this.speed = 0.15 + Math.random() * 0.35; // Math.random ist immer eine zufällige zahl zwischen 0 und 1    
    this.applyGravity();
    this.animate();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 348; // setzten der höhe wieder auf die ursprüngliche position
        this.speedY = 0; // stoppt die bewegung nach unten
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 348;  // 375 notwendig da mov.obj anders und chicken sonst auf anderer höhe.
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) { 
        this.moveLeft();
      }
    }, 1000 / 60);
  
    setInterval(() => {
      if (!this.isDead) { 
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150); 
  
    setInterval(() => {
      if (!this.isDead) { 
        this.jump();
      }
    }, 3000 + Math.random() * 2000); 
  }

  jump() {
    this.speedY = 2 + Math.random() * 10; 
  }
}

