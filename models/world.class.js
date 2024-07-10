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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 70,
        this.character.y + 130
      );
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

  checkCollisions() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle);
      }
    });
    this.level.coins.forEach((coin) => { 
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
      }
    });
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
    this.throwableObjects.forEach((bottle) => {
      this.checkCollisionWithEnemies(bottle);
    });
  }

  checkCollisionWithEnemies(bottle) {
    this.level.enemies.forEach((enemy, index) => {
      if (bottle.isColliding(enemy) && !bottle.hasHit) {
        if (enemy instanceof Endboss) {          
          enemy.hit();          
          this.statusBarEndboss.setPercentage(enemy.energy);
        } else if (enemy.IMAGES_DEAD && enemy.IMAGES_DEAD.length > 0) {
          enemy.loadImage(enemy.IMAGES_DEAD[0]);
          enemy.isDead = true;
          
          setTimeout(() => {
            if (this.level.enemies.includes(enemy)) {
              this.level.enemies.splice(index, 1);
            }
          }, 1000);
        }
        bottle.hasHit = true; // Markiere das Bottle-Objekt als getroffen
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
