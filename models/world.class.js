class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hiermit wird das vorher eingefügte bild gelöscht, wichtig bei bewegungen
    
    this.ctx.translate(this.camera_x, 0);

    // die reihenfolge hier bestimmt auch was im vordergrund ist und was nicht. daher achtung an dieser stelle
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

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
      // erstmal checken ob character eine andere ricvhtung hat
      this.ctx.save(); // wenn ja speichern vom aktuellen kontext
      this.ctx.translate(mo.width, 0); // verursacht das verschieben des bildes. also umgekehrt
      this.ctx.scale(-1, 1); //...gespiegelt einfügen
      mo.x = mo.x * -1;
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore(); // wieder rückgängig machen der spiegelung bei rechts laufen
    }
  }
}
