class Snake{
  constructor(snakeStartPosition, game){
    this.snakePosition = snakeStartPosition;
    this.direction = 2
    this.pastDirection = 2
    this.turning = false;
    this.futurePositions = []
    this.paused = false
    this.growing = 0


    this.snakeHead1 = game.physics.add.sprite((this.snakePosition[0][0] * snakeSize) + snakeSize / 2, (this.snakePosition[0][1] * snakeSize) + snakeSize / 2, 'snakeHead1');
    //this.flag
        //this.text.startFollow(this.snakeHead1);

    this.snakeHead2 = game.add.sprite((this.snakePosition[1][0] * snakeSize) + snakeSize / 2, (this.snakePosition[1][1] * snakeSize) + snakeSize / 2, 'snakeHead2');
    this.snakeTail1 = game.add.sprite((this.snakePosition[this.snakePosition.length - 1][0] * snakeSize) + snakeSize / 2, (this.snakePosition[this.snakePosition.length - 1][1] * snakeSize) + snakeSize / 2, 'snakeTail1');
    this.snakeTail2 = game.add.sprite((this.snakePosition[this.snakePosition.length - 2][0] * snakeSize) + snakeSize / 2, (this.snakePosition[this.snakePosition.length - 2][1] * snakeSize) + snakeSize / 2, 'snakeTail2');
    var bodies = this.snakePosition.slice(2, this.snakePosition.length - 2)
    this.bodies = []
    for(var b=0; b<bodies.length; b++){
      this.bodies.push(game.add.sprite((this.snakePosition[b+2][0] * snakeSize) + snakeSize / 2, (this.snakePosition[b+2][1] * snakeSize) + snakeSize / 2, 'snakeBody'))
    }

    this.snakeHead1.play("snakeHead1Anim", true)
    this.snakeHead2.play("snakeHead2Anim", true)
    this.snakeTail1.play("snakeTail1Anim", true)
    this.snakeTail2.play("snakeTail2Anim", true)
  }
  
  getTurn(){
    var turn = ''
    if(this.pastDirection != this.direction){
      if(this.pastDirection == 1 && this.direction == 2){
        turn = 'r'
      } else if(this.pastDirection == 2 && this.direction == 3){
        turn = 'r'
      } else if(this.pastDirection == 3 && this.direction == 4){
        turn = 'r'
      } else if(this.pastDirection == 4 && this.direction == 1){
        turn = 'r'
      } 
      this.turning = true;
      this.pastDirection = this.direction
    } else {
      this.turning = false;
    }
    return turn
  }
  updateSnakePosition(turn){
    if (this.direction == 1) {
        this.snakePosition.unshift([this.snakePosition[0][0], this.snakePosition[0][1] - 1, -90, turn])
        this.snakePosition.pop()
    } else if (this.direction == 2) {
        this.snakePosition.unshift([this.snakePosition[0][0] + 1, this.snakePosition[0][1], 0, turn])
        this.snakePosition.pop()
    } else if (this.direction == 3) {
        this.snakePosition.unshift([this.snakePosition[0][0],         this.snakePosition[0][1] + 1, 90, turn])
        this.snakePosition.pop()
    } else if (this.direction == 4) {
        this.snakePosition.unshift([this.snakePosition[0][0] - 1, this.snakePosition[0][1], 180, turn])
        this.snakePosition.pop()
    }
  }
  updateFramePosition(frame, pos){
      //console.log("frame: " + frame)
    frame.x = (this.snakePosition[pos][0] * snakeSize) + snakeSize / 2
    frame.y = (this.snakePosition[pos][1] * snakeSize) + snakeSize / 2
    frame.angle = this.snakePosition[pos][2]
  }
  checkTurns(frame, posPrev, posNow, anim, animChange){
    frame.flipY = false;
    if(this.snakePosition[posPrev][2] != this.snakePosition[posNow][2]){
      frame.play(animChange, true)
      if(this.snakePosition[posPrev][3] == 'r'){
        frame.flipY = true;
      }
    } else {
      frame.flipY = false;
      frame.play(anim, true)
    }
  }
  
  checkBodyTurns(frame, posPrev, posNow, anim, animChange){
    frame.flipY = false;
    if(this.snakePosition[posPrev][2] != this.snakePosition[posNow][2]){
      frame.setTexture(animChange)
      if(this.snakePosition[posPrev][3] == 'r'){
        frame.flipY = true;
      } 
    } else {
      frame.flipY = false;
      frame.setTexture(anim)
    }
  }
  moveMySnake(){
    if(typeof controls[0] !== 'undefined'){
      this.direction = controls[0]
      controls.shift()
    }
    var turn = this.getTurn();
    this.updateSnakePosition(turn)
  }
  updateSnake() {
    this.updateFramePosition(this.snakeHead1, 0)
    this.updateFramePosition(this.snakeHead2, 1)
    if(this.growing == 0){
      this.updateFramePosition(this.snakeTail1, this.snakePosition.length - 1)
      this.updateFramePosition(this.snakeTail2, this.snakePosition.length - 2)
    }

    for(var b=0; b<this.bodies.length; b++){
      this.updateFramePosition(this.bodies[b], b+2)
      this.checkBodyTurns(this.bodies[b], b+1, b+2, "snakeBody", "snakeBodyTurn")
    }
    this.snakeHead1.play("snakeHead1Anim", true)
    this.checkTurns(this.snakeHead2, 0, 1, "snakeHead2Anim", "snakeHeadCurve2Anim")
    if(this.growing > 0){
      this.snakeTail1.play("snakeSpriteTailFreeze1", true)
      this.snakeTail2.play("snakeSpriteTailFreeze2", true)
      this.growing -= 1
    } else {
      this.checkTurns(this.snakeTail1, this.snakePosition.length - 2, this.snakePosition.length - 1, "snakeTail1Anim", "snakeTailCurve1Anim")
      this.checkTurns(this.snakeTail2, this.snakePosition.length - 3, this.snakePosition.length - 2, "snakeTail2Anim", "snakeTailCurve2Anim")
    }
  }
  updateOtherSnake(){
    if(this.futurePositions.length != 0){
      //udjust for severe lag
      if(this.futurePositions.length >2){
        this.futurePositions = [this.futurePositions[this.futurePositions.length-1]]
      }
      this.snakePosition = this.futurePositions[0]
      this.futurePositions.shift()
      this.updateSnake()
    } else {
      console.log("it is lagging")
      //this.snakeHead1.frameRate = 15
      //this.snakeHead1.stop("snakeHead1Anim", true)
      this.paused = true
    }
  }
  checkUpdate(){
    if(this.paused){
      this.paused = false
      //this.snakeHead1.play("snakeHead1Anim", true)
      this.updateOtherSnake()
    }
  }

  grow(growing){
    this.snakePosition.splice(this.snakePosition.length-2, 0, JSON.parse(JSON.stringify(this.snakePosition[this.snakePosition.length-2])))
    this.snakePosition[this.snakePosition.length-2][0] -= 1
    this.snakePosition[this.snakePosition.length-1][0] -= 1
    this.bodies.push(gameThis.add.sprite((this.snakePosition[this.snakePosition.length-3][0] * snakeSize) + snakeSize / 2, (this.snakePosition[this.snakePosition.length-3][1] * snakeSize) + snakeSize / 2, 'snakeBody'))

    var newBody = this.bodies[this.bodies.length-1]
    newBody.angle = this.snakePosition[this.snakePosition.length-3][2]
    if(this.snakePosition[this.snakePosition.length-4][3] == "r"){
      newBody.setTexture("snakeBodyTurn")
    }
    this.growing = growing
  }
}