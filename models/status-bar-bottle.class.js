class StatusbarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Initializes a new instance of the StatusbarBottle class, which is a
     * specialized DrawableObject that displays a status bar for the number of
     * collected bottles.
     *
     * @memberof StatusbarBottle
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 95;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * sets the percentage of collected bottles and updates the status bar image
     *
     * @param {number} collectedBottles
     * @memberof StatusbarBottle
     */
    setPercentage(collectedBottles) {
        let percentage = collectedBottles * 20;
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * determines the index of the image based on the current percentage
     *
     * @returns {number}
     * @memberof StatusbarBottle
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage > 0 && this.percentage <= 20) {
            return 1;
        } else if (this.percentage > 20 && this.percentage <= 40) {
            return 2;
        } else if (this.percentage > 40 && this.percentage <= 60) {
            return 3;
        } else if (this.percentage > 60 && this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
