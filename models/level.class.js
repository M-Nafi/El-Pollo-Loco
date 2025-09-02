class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2830;
    bottles;
    coins;

    /**
     * Constructor for Level.
     *
     * @param {MovableObject[]} enemies - All enemies in the level.
     * @param {Cloud[]} clouds - All clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - All background objects in the level.
     * @param {ThrowableObject[]} bottles - All bottles in the level.
     * @param {Coin[]} coins - All coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}
