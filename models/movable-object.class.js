class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; 
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
   * @returns {boolean} 
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
   * @param {MovableObject} mo 
   * @returns {boolean} 
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
   * reduces the object's energy and handles hit effects
   *
   * @memberof MovableObject
   */
  hit() {
    if (!this.isHurt()) {
      this.reduceEnergy();
      this.handleHitEffects();
    }
  }

  /**
   * reduces the object's energy by 20% ensuring it does not fall below 0
   *
   * @memberof MovableObject
   */
  reduceEnergy() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * handles effects when the object is hit including setting the last hit time
   * triggering specific effects if the object's energy is depleted
   *
   * @memberof MovableObject
   */
  handleHitEffects() {
    if (this.energy > 0) {
      this.lastHit = new Date().getTime();
      this.checkForEndbossEffects();
    } else if (this instanceof Endboss) {
      this.isDead = true;
      this.deadAnimation();
      this.handleEndbossIsDeath();
    }
  }

  /**
   * checks for specific effects if the object is an endboss and handles endboss specific
   * behaviors, including incrementing the hit count and triggering death effects if needed
   *
   * @memberof MovableObject
   */
  checkForEndbossEffects() {
    if (this instanceof Endboss) {
      this.hitCount++;
      this.hurtAnimation();
      if (this.hitCount >= 5) {
        this.energy = 0;
        this.isDead = true;
        this.deadAnimation();
        this.handleEndbossIsDeath();
      }
    }
  }

  /**
   * checks if the object has been recently hurt
   *
   * @returns {boolean} 
   * @memberof MovableObject
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; 
    timepassed = timepassed / 1000; 
    return timepassed < 1;
  }

  /**
   * checks if the object is dead based on its energy level
   *
   * @returns {boolean} 
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
   * @param {string[]} images 
   * @memberof MovableObject
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
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
   * @returns {boolean} 
   * @memberof MovableObject
   */
  isFalling() {
    return this.speedY < 0;
  }

  /**
   * registers and mutes an audio object if necessary
   *
   * @param {HTMLAudioElement} audio
   * @memberof MovableObject
   */
  registerAndMuteAudio(audio) {
    window.registerAudio(audio);
    if (window.isMuted()) {
      audio.muted = true;
    }
  }
}
