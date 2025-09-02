class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject.
     *
     * @param {string} imagePath - Path to the image of the object.
     * @param {number} x - The x-coordinate of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
