function preload(){
  //add images
  this.load.image("snakeHead1", "/static/phaser/assets/snakeHead1.png");
  this.load.image("snakeHead2", "/static/phaser/assets/snakeHead2.png");
  this.load.image("snakeBody", "/static/phaser/assets/snakeBody.png");
  this.load.image("snakeBodyTurn", "/static/phaser/assets/snakeBodyTurn.png");
  this.load.image("snakeTail1", "/static/phaser/assets/snakeTail.png");
  this.load.image("snakeTail2", "/static/phaser/assets/snakeBody.png");
  this.load.image("apple", "/static/phaser/assets/apple.png");

  // powerups
  this.load.image("speed", "/static/phaser/assets/speed-powerup.png");
  this.load.image("wall", "/static/phaser/assets/wall-powerup.png");
  this.load.image("shield", "/static/phaser/assets/shield-powerup.png");
  this.load.image("growth", "/static/phaser/assets/apple-powerup.png");

  //flag
  this.load.image("blueFlag", "/static/phaser/assets/blue-flag.png")
  this.load.image("redFlag", "/static/phaser/assets/red-flag.png")

  //add spritesheets
  this.load.spritesheet("snakeSpriteHead1", "/static/phaser/assets/snakeSpriteSheetHead1.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteHead2", "/static/phaser/assets/snakeSpriteSheetHead2.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTail1", "/static/phaser/assets/snakeSpriteSheetTail1.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTail2", "/static/phaser/assets/snakeSpriteSheetTail2.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteHeadCurve1", "/static/phaser/assets/snakeSpriteSheetHeadCurve1.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteHeadCurve2", "/static/phaser/assets/snakeSpriteSheetHeadCurve2.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTailCurve1", "/static/phaser/assets/snakeSpriteSheetTailCurve.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTailCurve2", "/static/phaser/assets/snakeSpriteSheetTailCurve2.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTailFreeze1", "/static/phaser/assets/snakeSpriteSheetTail1Freeze.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
  this.load.spritesheet("snakeSpriteTailFreeze2", "/static/phaser/assets/snakeSpriteSheetTail2Freeze.png", {
    frameWidth: snakeSize, 
    frameHeight: snakeSize,
  })
}