class smallChicken extends MovableObject {
    y = 375;     // hiermit wird horizontale posiiton festgelegt, wo die chickens laufen
    height = 40;  // hiermit wird die höhe der chickens festfelegt
    width = 45;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');  
        this.loadImages(this.IMAGES_WALKING);      
        this.x = 500 + Math.random() * 1700;  // starten von links 300 px bis max 500 dazwischen zufällige zahl
        // bei 720px breite. später entsprechend anpassen !!!
        this.speed = 0.17 + Math.random() * 0.45;
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
        }, 150);  // geschwindigkeit der chicken später entsprechend anpassen
       
      }

}