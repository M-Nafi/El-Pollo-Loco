class Chicken extends MovableObject {
    y = 348;     // hiermit wird horizontale posiiton festgelegt, wo die chickens laufen
    height = 70;  // hiermit wird die höhe der chickens festfelegt
    width = 65;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');  
        this.loadImages(this.IMAGES_WALKING);      
        this.x = 300 + Math.random() * 719*2;  // starten von links 300 px bis max 500 dazwischen zufällige zahl
        // bei 720px breite. später entsprechend anpassen !!!
        this.speed = 0.15 + Math.random() * 0.35;  // Math.random ist immer eine zufällige zahl zwischen 0 und 1 
        // 0.15 mindestens 
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
          let i = this.currentImage % this.IMAGES_WALKING.length; // i = ist aufgrund der modulo (&) die reihenfolge von images walking in der unendlich schleife
          let path = this.IMAGES_WALKING[i];
          this.img = this.imageCache[path]; 
          this.currentImage++;
        }, 200);  // geschwindigkeit der chicken später entsprechend anpassen
       
      }

}