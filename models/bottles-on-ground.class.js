class Bottles extends MovableObject {
    height = 60;
    width = 50;
    y = 360;
    collectedBottles_sound = new Audio('audio/bottleCollect.mp3');

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructor for Bottles class
     *
     * @param {number} x - x position of the bottle
     * @param {number} y - y position of the bottle
     * @param {number} height - height of the bottle
     * @param {number} width - width of the bottle
     * @param {number} speed - speed of the bottle
     * @param {Array} images - array of images for the bottle
     * @param {Audio} collectedBottles_sound - sound effect for when a bottle is collected
     *
     * Loads the first image in the array, sets the x and y positions, height and width, and starts the animation.
     * Registers the collectedBottles_sound and sets it to mute.
     * Generates a random x position between 200 and 2200.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 200 + Math.random() * 2000;
        this.bottlesOnGround();
        this.registerAndMuteAudio(this.collectedBottles_sound);
    }

    /**
     * Plays the bottles on ground animation at regular intervals
     *
     * Calls playAnimation with the array of bottle images and an interval of 500 milliseconds
     *
     * @memberof Bottles
     */
    bottlesOnGround() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 500);
    }
}
