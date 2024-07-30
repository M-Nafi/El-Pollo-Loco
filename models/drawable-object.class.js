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
   * @param {string} path 
   * @memberof DrawableObject
   */
  loadImage(path) {
    this.img = new Image(); 
    this.img.src = path;
  }

  /**
   * draws the object on given canvas context
   *
   * @param {CanvasRenderingContext2D} ctx
   * @memberof DrawableObject
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * draws a frame around the object on given canvas context
   *
   * @param {CanvasRenderingContext2D} ctx
   * @memberof DrawableObject
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.stroke();
  }

  /**
   * loads multiple images from the specified array of paths and caches them
   *
   * @param {string[]} arr
   * @memberof DrawableObject
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
