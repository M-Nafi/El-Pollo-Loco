class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  statusBarCoin = new StatusbarCoin();
  statusBarBottle = new StatusbarBottle();
  statusBarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;
  maxBottles = 5;
  maxCoins = 5;
  coins = new Coins();
  game_sound = new Audio('audio/main.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusBarEndboss.world = this;
    this.draw();
    this.setWorld();
    this.run();
    this.game_sound.loop = true;
    this.game_sound.play();
    this.registerAndMuteAudio(this.game_sound);
  }

  /**
   * registers audio with the global audio handler and mutes it if needed
   *
   * @param {HTMLAudioElement} audio
   * @memberof World
   */
  registerAndMuteAudio(audio) {
    window.registerAudio(audio);
    if (window.isMuted()) {
      audio.muted = true;
    }
  }

  /**
   * sets the world reference for the character
   *
   * @memberof World
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * starts game loops for checking collisions and throwing objects
   *
   * @memberof World
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 75);
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  /**
   * handles throwing a bottle if d key is pressed and bottles are available
   *
   * @memberof World
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let offsetX;
      if (this.character.otherDirection) {
        offsetX = -25;
      } else {
        offsetX = 70;
      }
      let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 130, this);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBarBottle.setPercentage(this.collectedBottles);
    }
  }

  /**
   * collects coin and updates the status bar
   *
   * @param {Coin} coin
   * @memberof World
   */
  collectCoin(coin) {
    let index = this.level.coins.indexOf(coin);
    if (index > -1) {
      this.level.coins.splice(index, 1);
    }
    this.collectedCoins++;
    this.coins.collectedCoins_sound.play();
    let coinPercentage = (this.collectedCoins / this.maxCoins) * 100;
    this.statusBarCoin.setPercentage(coinPercentage);
  }

  /**
   * collects bottle and updates the status bar
   *
   * @param {Bottle} bottle
   * @memberof World
   */
  collectBottle(bottle) {
    if (this.collectedBottles < this.maxBottles) {
      let index = this.level.bottles.indexOf(bottle);
      if (index > -1) {
        this.level.bottles.splice(index, 1);
        setTimeout(() => {
          this.level.bottles.push(bottle);
        }, 5000);
      }
      this.collectedBottles++;
      bottle.collectedBottles_sound.play();
      this.statusBarBottle.setPercentage(this.collectedBottles);
    }
  }

  /**
   * checks for collisions between the character and other objects in the level
   *
   * @memberof World
   */
  checkCharacterCollisions() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) this.collectBottle(bottle);
    });
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) this.collectCoin(coin);
    });
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead && this.character.isFalling() ) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  /**
   * handles collisions between the character and an enemy
   *
   * @param {Enemy} enemy
   * @memberof World
   */
  handleEnemyCollision(enemy) {
    if (enemy instanceof Endboss || 
        !(this.isCharacterAboveEnemy(this.character, enemy) ||
        (this.character.isAboveGround() && this.character.acceleration >= 2) ) ) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    } else if (this.isCharacterAboveEnemy(this.character, enemy)) {
      this.hitEnemyFromAbove(enemy);
    }
  }

  /**
   * checks for collisions between throwable objects and enemies
   *
   * @memberof World
   */
  checkThrowableObjectsCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.checkCollisionWithEnemies(bottle);
    });
  }

  /**
   * checks all collisions in the world
   *
   * @memberof World
   */
  checkCollisions() {
    this.checkCharacterCollisions();
    this.checkThrowableObjectsCollisions();
    if (this.character.isDead()) {
      this.game_sound.pause();
    }
  }

  /**
   * determines if the character is above an enemy
   *
   * @param {Character} character
   * @param {Enemy} enemy
   * @returns {boolean}
   * 
   * @memberof World
   */
  isCharacterAboveEnemy(character, enemy) {
    return character.y + character.height < enemy.y + enemy.height;
  }

  /**
   * handles the case where the character hits an enemy from above
   *
   * @param {Enemy} enemy
   * @memberof World
   */
  hitEnemyFromAbove(enemy) {
    this.markEnemyAsDead(enemy);
    this.removeEnemyAfterDelay(enemy);
  }

  /**
   * marks the enemy as dead and triggers the death animation
   *
   * @param {Enemy} enemy
   * @memberof World
   */
  markEnemyAsDead(enemy) {
    enemy.loadImage(enemy.IMAGES_DEAD[0]);
    enemy.hit();
    enemy.isDead = true;
  }

  /**
   * removes the enemy from the level after 1 second
   *
   * @param {Enemy} enemy
   * @memberof World
   */
  removeEnemyAfterDelay(enemy) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index !== -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 1000);
  }

  /**
   * checks if the world is currently in a hurt state
   *
   * @returns {boolean}
   * @memberof World
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * handles collision between a throwable object and an enemy
   *
   * @param {ThrowableObject} bottle
   * @param {Enemy} enemy
   * @param {number} index
   * @memberof World
   */
  handleBottleCollision(bottle, enemy, index) {
    if (enemy instanceof Endboss ||
        enemy instanceof Chicken ||
        enemy instanceof smallChicken) {
      if (!bottle.hasHit) {
        bottle.playSplashAnimation();
        this.handleEndbossAfterCollision(enemy, index);
        bottle.hasHit = true;
      }
    }
  }

  /**
   * handles effects of a bottle collision with an endboss or other enemies
   *
   * @param {Enemy} enemy
   * @param {number} index
   * @memberof World
   */
  handleEndbossAfterCollision(enemy, index) {
    if (enemy instanceof Endboss) {
      enemy.hit();
      enemy.increaseSpeed();
      this.statusBarEndboss.setPercentage(enemy.energy);
    } else {
      enemy.loadImage(enemy.IMAGES_DEAD[0]);
      enemy.isDead = true;
      setTimeout(() => {
        if (this.level.enemies.includes(enemy)) {
          this.level.enemies.splice(index, 1);
        }
      }, 1000);
    }
  }

  /**
   * checks for collisions between throwable objects and enemies
   *
   * @param {ThrowableObject} bottle
   * @memberof World
   */
  checkCollisionWithEnemies(bottle) {
    this.level.enemies.forEach((enemy, index) => {
      if (bottle.isColliding(enemy) && !bottle.hasHit) {
        this.handleBottleCollision(bottle, enemy, index);
      }
    });
  }

  /**
   * draws all game objects into the canvas
   *
   * @memberof World
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hiermit wird das vorher eingefügte bild gelöscht, wichtig bei bewegungen

    this.ctx.translate(this.camera_x, 0);
    // die reihenfolge hier bestimmt auch was im vordergrund ist
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0); // forwards

    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * adds multiple objects to the map
   *
   * @param {Array<Object>} objects
   * @memberof World
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * adds a single object to the map and handles flipping if necessary
   *
   * @param {MovableObject} mo
   * @memberof World
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      // checken ob character eine andere ricvhtung hat
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * flips an image horizontally
   *
   * @param {MovableObject} mo
   * @memberof World
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); // verursacht das verschieben des bildes. also umgekehrt
    this.ctx.scale(-1, 1); //...gespiegelt einfügen
    mo.x = mo.x * -1;
  }

  /**
   * flips an image back to its original orientation
   *
   * @param {MovableObject} mo - The object whose image to restore.
   * @memberof World
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore(); // wieder rückgängig machen der spiegelung bei rechts laufen
  }
}
