class Chicken extends MovableObject {
    y = 352;     // hiermit wird horizontale posiiton festgelegt, wo die chickens laufen
    height = 80;  // hiermit wird die höhe der chickens festfelegt

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');        
        this.x = 300 + Math.random() * 500;  // starten von links 300 px bis max 500 dazwischen zufällige zahl
        // bei 720px breite. später entsprechend anpassen !!!
    }

}