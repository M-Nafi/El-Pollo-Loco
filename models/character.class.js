class Character extends MovableObject {
  speed = 5;
  y = 55;
  world;
  walking_sound = new Audio('audio/running.mp3');

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
          this.walking_sound.play();
        }
      } else if (this.world.keyboard.LEFT && this.x > -500) {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
          this.walking_sound.play();
        }
      } else {
        this.walking_sound.pause();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.walking_sound.pause(); // sound beim springen
      }

      this.world.camera_x = -this.x + 75;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50); // 1000
  }
}

