class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; // geschwindigkeit fallen. anpassen!
  energy = 100;
  lastHit = 0;
  hitCount = 0;

  /**
   * applies gravity to the object by adjusting its y position and velocity
   *
   * @memberof MovableObject
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * checks if the object is above the ground
   *
   * @returns {boolean} true if above the ground, false otherwise
   * @memberof MovableObject
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 140;
    }
  }

  /**
   * checks for collision with another object
   *
   * @param {MovableObject} mo - the other object to check for collision
   * @returns {boolean} true if colliding, false otherwise
   * @memberof MovableObject
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * the offset values for the object
   *
   * @memberof MovableObject
   */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * reduces the object's energy and handles death if energy falls to zero
   *
   * @memberof MovableObject
   */
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

  /**
   * checks if the object has been recently hurt
   *
   * @returns {boolean} true if the object is hurt, false otherwise
   * @memberof MovableObject
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // differenz in ms
    timepassed = timepassed / 1000; // differenz in sekunden
    return timepassed < 1;
  }

  /**
   * checks if the object is dead based on its energy level
   *
   * @returns {boolean} true if the object is dead, false otherwise
   * @memberof MovableObject
   */
  isDead() {
    if (this.energy == 0) {
      if (this instanceof Character) {
        this.handlePepeIsDeath();
      }
      return true;
    }
    return false;
  }

  /**
   * plays the animation based on the provided image paths
   *
   * @param {string[]} images - array of image paths for the animation
   * @memberof MovableObject
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; // i = ist aufgrund der modulo (& bzw. ist der rest...) die reihenfolge von images walking in der unendlich schleife
    // praktisch sieht das so aus: i = 0, 1, 2, 3, 4, 5 und dann nicht 6 sondern wieder von vorne 0, 1, 2 usw...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * moves the object to the right by its speed value
   *
   * @memberof MovableObject
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * moves the object to the left by its speed value
   *
   * @memberof MovableObject
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * sets the object's vertical speed to jump
   *
   * @memberof MovableObject
   */
  jump() {
    this.speedY = 22;
  }

  /**
   * checks if the object is falling based on its vertical speed
   *
   * @returns {boolean} true if the object is falling, false otherwise
   * @memberof MovableObject
   */
  isFalling() {
    return this.speedY < 0;
  }

  /**
   * registers and mutes an audio object if necessary
   *
   * @param {HTMLAudioElement} audio - audio object to register and mute
   * @memberof MovableObject
   */
  registerAndMuteAudio(audio) {
    window.registerAudio(audio);
    if (window.isMuted()) {
      audio.muted = true;
    }
  }
}
