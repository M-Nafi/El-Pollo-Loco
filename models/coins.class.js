class Coins extends MovableObject {
  width = 100;
  height = 100;
  y = 130;
  x = 500;

  IMAGES_COINS = [
    "img/8_coin/coin_1.png", 
    "img/8_coin/coin_2.png"
  ];

  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = 200 + Math.random() * 2000;
    this.y = 150 + Math.random() * 100;   
    this.coinsInAir();
  }

  coinsInAir() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}