class Coins extends MovableObject {
    width = 100;
    height = 100;
    y = 130;
    x = 500;
    collectedCoins_sound = new Audio('audio/coin.mp3');

    IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

    /**
     * Constructor for the Coins class
     *
     * Loads the images for the coins animation, sets the x and y coordinates of the coin
     * to a random value, plays the coinsInAir animation and registers/mutes the collectedCoins_sound
     * @memberof Coins
     */
    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.y = 130 + Math.random() * 100;
        this.coinsInAir();
        this.registerAndMuteAudio(this.collectedCoins_sound);
    }

    /**
     * plays the coin animation at regular intervals
     *
     * @memberof Coins
     */
    coinsInAir() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 500);
    }

    /**
     * sets the offset for the collision detection
     *
     * @memberof Coins
     */
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
    };
}
