class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2230;
    bottles;

    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}