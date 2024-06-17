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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // i = ist aufgrund der modulo (& bzw. ist der rest...) die reihenfolge von images walking in der unendlich schleife
        // praktisch sieht das so aus: i = 0, 1, 2, 3, 4, 5 und dann nicht 6 sondern wieder von vorne 0, 1, 2 usw...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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