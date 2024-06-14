class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 280;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); // ist das gleiche wie document.getElementById('image')...
        this.img.src = path;
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

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
          this.x -= this.speed;   // statt this speed kann man auch 0.15 reinschreiben. 
        }, 1000 / 60);
      }
}