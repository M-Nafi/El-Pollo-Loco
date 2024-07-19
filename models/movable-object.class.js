class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; // geschwindigkeit fallen. anpassen!
  energy = 100;
  lastHit = 0;
  hitCount = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 140;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  hit() {
    if (!this.isHurt()) {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        if (this instanceof Endboss) {
          this.hitCount++;
          this.hurtAnimation();
          if (this.hitCount == 5) {
            this.energy = 0;
            this.isDead = true;
            this.deadAnimation();
            if (this instanceof Endboss) {
              this.handleEndbossIsDeath();
            }
          }
        }
      }
    }
  }  
  // new date = zeit setzen. vergangene zeit seit 01.01.1970 in ms

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // differenz in ms
    timepassed = timepassed / 1000; // differenz in sekunden
    return timepassed < 1;
  }

  isDead() {
    if (this.energy == 0) {
      if (this instanceof Character) {        
        this.handlePepeIsDeath();        
      }
      return true;
    }
    return false;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // i = ist aufgrund der modulo (& bzw. ist der rest...) die reihenfolge von images walking in der unendlich schleife
    // praktisch sieht das so aus: i = 0, 1, 2, 3, 4, 5 und dann nicht 6 sondern wieder von vorne 0, 1, 2 usw...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 22;
  }

  isFalling() {
    return this.speedY < 0;
  }
}
