class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 145;
  height = 280;
  width = 100;

  /**
   * loads an image from specified path and assigns it to the img property
   *
   * @param {string} path - path to image file
   *
   * @memberof Chicken
   */
  loadImage(path) {
    this.img = new Image(); // ist das gleiche wie document.getElementById('image')...
    this.img.src = path;
  }

  /**
   * draws the object on given canvas context
   *
   * @param {CanvasRenderingContext2D} ctx - the canvas rendering context
   *
   * @memberof Chicken
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * draws a frame around the object on given canvas context
   *
   * @param {CanvasRenderingContext2D} ctx - the canvas rendering context
   *
   * @memberof Chicken
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'white';

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
   * loads multiple images from the specified array of paths and caches them
   *
   * @param {string[]} arr - array of image file paths
   *
   * @memberof Chicken
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
