class MovableObject {
    x = 120;
    y = 150;
    img;
    height = 280;
    width = 100;

    loadImage(path) {
        this.img = new Image(); // ist das gleiche wie document.getElementById('image')...
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}