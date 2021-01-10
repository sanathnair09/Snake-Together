class Powerup{
    constructor(x,y, name){
        this.powerup = gameThis.add.sprite((x * snakeSize) + snakeSize / 2, (y * snakeSize) + snakeSize / 2, name);

    }
    updatePowerUp(x,y,name){
        this.powerup.x = (x * snakeSize) + snakeSize / 2
        this.powerup.y = (y * snakeSize) + snakeSize / 2
        this.powerup.setTexture(name)
  }
}