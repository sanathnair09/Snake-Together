class Apple{
  constructor(x,y){
    this.apple = gameThis.add.sprite((x * snakeSize) + snakeSize / 2, (y * snakeSize) + snakeSize / 2, 'apple');
  }
  updateApple(x,y){
    this.apple.x = (x * snakeSize) + snakeSize / 2
    this.apple.y = (y * snakeSize) + snakeSize / 2
  }
}