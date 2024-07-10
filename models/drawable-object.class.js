class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 145;
  height = 280;
  width = 100;

  loadImage(path) {
    this.img = new Image(); // ist das gleiche wie document.getElementById('image')...
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
  
    if (
      this instanceof Character ||
      this instanceof Endboss ||
      this instanceof Bottles ||
      this instanceof Coins ||
      this instanceof Chicken ||
      this instanceof smallChicken
    ) {
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
    }
    ctx.stroke();
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
}
