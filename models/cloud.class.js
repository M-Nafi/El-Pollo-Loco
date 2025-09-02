class Cloud extends MovableObject {
    y = 30;
    height = 200;
    width = 2200;

    /**
     * Initializes a new Cloud object
     *
     * Loads the full cloud image, sets the x position to a random value between 0 and 1440, and starts the animation.
     * @memberof Cloud
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = Math.random() * 1440;
        this.animate();
    }

    /**
     * continuously moves the object to the left and calls itself on the next animation frame
     *
     * @memberof Cloud
     */
    animate() {
        this.moveLeft();
        requestAnimationFrame(() => this.animate());
    }
}
