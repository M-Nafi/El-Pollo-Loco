class MovableObject {
  x = 120;
  y = 145;
  img;
  height = 280;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; // geschwindigkeit fallen. anpassen!
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 140;
  }

  loadImage(path) {
    this.img = new Image(); // ist das gleiche wie document.getElementById('image')...
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';

    if (this instanceof Character || this instanceof Endboss) {
      // berechnung position des characters
      let centerX = this.x + this.width / 2; // feststellung mittelpunkt gesamte breite
      let centerY = this.y + this.height - this.visibleHeight; // startpunkt sichtbare höhe
      let visibleCenterX = this.visibleWidth / 2; // hälfte sichtbaren breite

      let frameX = centerX - visibleCenterX; // rahmen um den sichtbaren bereich des charakters
      let frameY = centerY;

      ctx.rect(frameX, frameY, this.visibleWidth, this.visibleHeight);
    } else if (this instanceof Chicken || this instanceof smallChicken) {
      ctx.rect(this.x, this.y, this.width, this.height);
    }
    ctx.stroke();
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();  // zeit setzen. vergangene zeit seit 01.01.1970 in ms
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;  // differenz in ms
    timepassed = timepassed / 1000;  // differenz in sekunden   
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
    this.x -= this.speed; // statt this speed kann man auch 0.15 reinschreiben.
  }

  jump() {
    this.speedY = 22;  // höhe des sprung evtl anpassen
  }
}
