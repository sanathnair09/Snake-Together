function update(){
  var temp = 0
  if(canMove){
  if (this.key_W.isDown  && snake1.direction != 3) {
    temp = 1
    //snake1.direction = 1
  } else if (this.key_S.isDown && snake1.direction != 1) {
    temp = 3
    //snake1.direction = 3
  } 
  if (this.key_A.isDown && snake1.direction != 2) {
    temp = 4
    //snake1.direction = 4
  } else if (this.key_D.isDown && snake1.direction != 4) {
    temp = 2
    //snake1.direction = 2
  }
  }
  //console.log(controls)
  if(temp != controls[controls.length-1] && temp != 0){
    controls.push(temp)
    sendPosition()
  }
  //
  
  //
  if(blueFollowing){
    gameThis.physics.moveToObject(blueFlag, blueFollowing, 225)
  }
  if(redFollowing){
    gameThis.physics.moveToObject(redFlag, redFollowing, 225)
  }

  if (this.key_ESC.isDown) {
      backgroundArray=[[]]
      this.scene.start("StartScene")
  }
  /*
  try{
    if(snake1.snakeHead1.anims.currentFrame.index == 1){
      snake1.text.x = snake1.snakeHead1.x-32
      snake1.text.y = snake1.snakeHead1.y-30
    } else if(snake1.snakeHead1.anims.currentFrame.index == 2){
      snake1.text.x = snake1.snakeHead1.x-32+(32/4)
      snake1.text.y = snake1.snakeHead1.y-30
    } else if(snake1.snakeHead1.anims.currentFrame.index == 3){
      snake1.text.x = snake1.snakeHead1.x-32+(32/4*2)
      snake1.text.y = snake1.snakeHead1.y-30
    } else if(snake1.snakeHead1.anims.currentFrame.index == 4){
      snake1.text.x = snake1.snakeHead1.x-32+(32/4*3)
      snake1.text.y = snake1.snakeHead1.y-30
    }
    
  } catch {
    console.log("error")
  }*/
  
}

function sendPosition(){
  //gameid, playerid, position
  socket.emit('sendPositon', [gameId, myself.playerNum, snake1.snakePosition]);
}