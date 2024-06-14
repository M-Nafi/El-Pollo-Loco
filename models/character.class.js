class Character extends MovableObject {
  speed = 5;


  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;


  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }


  animate() {
    setInterval(() => {

      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

    }, 1000 / 60);


    setInterval(() => {

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length; // i = ist aufgrund der modulo (& bzw. ist der rest...) die reihenfolge von images walking in der unendlich schleife
        // praktisch sieht das so aus: i = 0, 1, 2, 3, 4, 5 und dann nicht 6 sondern wieder von vorne 0, 1, 2 usw...
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }

    }, 50); // 1000
  }

  
  jump() {}
}
