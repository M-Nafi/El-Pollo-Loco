class Chicken extends MovableObject {

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 500;  // starten von links 250 px bis max 500 dazwischen zufällige zahl
        // bei 720px breite. später entsprechend anpassen !!!
    }

}