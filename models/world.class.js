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
    this.statusBarEndboss.world = this; // wichtig! spiel sound stoppen wenn spiel zu ende ist.
    this.draw();
    this.setWorld();
    this.run();
    this.game_sound.loop = true;
    this.game_sound.play();
    this.registerAndMuteAudio(this.game_sound);
  }

  registerAndMuteAudio(audio) {
    window.registerAudio(audio);
    if (window.isMuted()) {
      audio.muted = true;
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 75);
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let offsetX = this.character.otherDirection ? -25 : 70;
      let bottle = new ThrowableObject(this.character.x + offsetX,this.character.y + 130, this);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBarBottle.setPercentage(this.collectedBottles);
    }
  }

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

  checkCharacterCollisions() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) this.collectBottle(bottle);
    });
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) this.collectCoin(coin);
    });

    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !enemy.isDead &&
        this.character.isFalling()
      ) {
        this.handleEnemyCollision(enemy);
      }
    });
  }

  handleEnemyCollision(enemy) {
    if (
      enemy instanceof Endboss ||
      !(
        this.isCharacterAboveEnemy(this.character, enemy) ||
        (this.character.isAboveGround() && this.character.acceleration >= 2)
      )
    ) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    } else if (this.isCharacterAboveEnemy(this.character, enemy)) {
      this.hitEnemyFromAbove(enemy);
    }
  }

  checkThrowableObjectsCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.checkCollisionWithEnemies(bottle);
    });
  }

  checkCollisions() {
    this.checkCharacterCollisions();
    this.checkThrowableObjectsCollisions();

    if (this.character.isDead()) {
      this.game_sound.pause();
    }
  }

  isCharacterAboveEnemy(character, enemy) {
    return character.y + character.height < enemy.y + enemy.height;
  }

  hitEnemyFromAbove(enemy) {
    this.markEnemyAsDead(enemy);
    this.removeEnemyAfterDelay(enemy);
  }

  markEnemyAsDead(enemy) {
    enemy.loadImage(enemy.IMAGES_DEAD[0]);
    enemy.hit();
    enemy.isDead = true;
  }

  removeEnemyAfterDelay(enemy) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index !== -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 1000);
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1; // 1 sek immunität nach hit
  }

  handleBottleCollision(bottle, enemy, index) {
    if (
      enemy instanceof Endboss ||
      enemy instanceof Chicken ||
      enemy instanceof smallChicken
    ) {
      if (!bottle.hasHit) {
        bottle.playSplashAnimation();
        this.handleEndbossAfterCollision(enemy, index);
        bottle.hasHit = true;
      }
    }
  }

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

  checkCollisionWithEnemies(bottle) {
    this.level.enemies.forEach((enemy, index) => {
      if (bottle.isColliding(enemy) && !bottle.hasHit) {
        this.handleBottleCollision(bottle, enemy, index);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hiermit wird das vorher eingefügte bild gelöscht, wichtig bei bewegungen

    this.ctx.translate(this.camera_x, 0);
    // die reihenfolge hier bestimmt auch was im vordergrund ist und was nicht. daher achtung an dieser stelle
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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  flipImage(mo) {
    this.ctx.save(); // wenn ja speichern vom aktuellen kontext
    this.ctx.translate(mo.width, 0); // verursacht das verschieben des bildes. also umgekehrt
    this.ctx.scale(-1, 1); //...gespiegelt einfügen
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore(); // wieder rückgängig machen der spiegelung bei rechts laufen
  }
}
