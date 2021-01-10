var socket = io();
var socketid = ''
var gameId
var otherPlayers = []
var otherSnakes = [[],[],[],[],[],[]]
var applePos = []
var powerUpsPos =[]
var myself
var playerCount = 1
var flagPos = []

//contact server on connect
function startTheGame(){
  socket.emit('begin_chat', "joined");
  socketid = socket.id
}
function startForEveryone(){
  socket.emit('startGame', "start our game")
}

//recieve data to start game
socket.on('recieveData', function(data) {
    myself = data[2]
    snakePosMe = JSON.parse(JSON.stringify(myself.startingPos))
    otherPlayers = data[1]
    gameId = data[0]
    applePos = data[3]
    wallArray = data[4]
    blueBase = data[5]
    redBase = data[6] 
    flagPos = data[7] 
    powerUpPos = data[8]
    playerCount = otherPlayers.length+1
});

//recieve notice that someone started the game
socket.on('gameStarted', function(data) {
  waitingThis.scene.start("GameScene");
});

//add new players on join
socket.on('addPlayer', function(data) {
    otherPlayers.push(data)
    addPlayer(data)
    if(startWaitingText){
      startWaitingText.setText(otherPlayers.length+"/6")
    }
    
});

//add new players on join
socket.on('dead', function(data) {
  for(var dead of data){
    if(dead.socketid == socketid){
      canMove = false
      gameThis.cameras.main.fadeOut(1000);
      controls = []
      snake1.snakeTail2.stop("snakeHead1Anim")
      if(myself.teamSide == 1){
        var flagColor = 1
      } else {
        var flagColor = 0
      }
      socket.emit("updateFlagPosition", [gameId, myself.playerNum, flagColor])
      setTimeout(function(){
        gameThis.cameras.main.fadeIn(1000);
        snake1.snakeHead1.destroy()
        snake1.snakeHead2.destroy()
        snake1.snakeTail1.destroy()
        snake1.snakeTail2.destroy()
        for(var body of snake1.bodies){
          body.destroy()
        }
        
        snake1.snakePosition = JSON.parse(JSON.stringify(snakePosMe))
        snake1 = new Snake(JSON.parse(JSON.stringify(snakePosMe)), gameThis)
        
        snake1.snakeTail2.on('animationcomplete', function(){
          snake1.moveMySnake()
          snake1.updateSnake()
          sendPosition()
        });
        if(myself.teamSide == 2){
          snake1.pastDirection = 4
          snake1.direction = 4
        }
        gameThis.cameras.main.setBounds(0, 0, 2048, 704);
        gameThis.cameras.main.startFollow(snake1.snakeHead1, true, 0.05, 0.05);
        canMove = true
      }, 2000)
    } else {

    }
  }
});

//recieve position of other players
socket.on('recievePosition', function(data) {
  try{
    otherSnakes[data[0]].futurePositions.push(data[1])
    otherSnakes[data[0]].checkUpdate()
  } catch(err) {
    console.log(err)
  }
});


//recieve position of apples 
socket.on('updateApple', function(data) {
  if(data[0].socketid == socketid){
    snake1.grow(1)
  } else {
    otherSnakes[data[0].playerNum].grow(1)
    console.log("other person grow")
  }
  for(var x=0; x<apples.length; x++){
    apples[x].updateApple(data[1][x][0], data[1][x][1])
  }
});

socket.on('updateFlagPerson', function(data) {
  //window.alert(data)
  //blueFlag.destroy()
  
  if(data[0].socketid == socketid){
    //snake1.flag = gameThis.physics.add.image(snake1.snakeHead1.x,snake1.snakeHead1.y,"blueFlag");
    //snake1.flag.depth = 100;
    if(data[1] == "blue"){
      blueFollowing = snake1.snakeHead1
    } else {
      redFollowing = snake1.snakeHead1
    }
  } else {
    if(data[1] == "blue"){
      blueFollowing = otherSnakes[data[0].playerNum].snakeHead1
    } else {
      redFollowing = otherSnakes[data[0].playerNum].snakeHead1
    }
  }
});


socket.on('updatePowerup', function(data){
     for(var x=0; x<powerUps.length; x++){
        powerUps[x].updatePowerUp(data[x][0], data[x][1], data[x][2])
  }
})

socket.on('win', function(data) {
    endText = (data)
    canMove = false
    gameThis.cameras.main.fadeOut(1000);
    controls = []
    snake1.snakeTail2.stop("snakeHead1Anim")
    console.log(endText)
    setTimeout(function(){
      gameThis.scene.start("EndScene");
    },1000)
})
socket.on('speed', function(data) {
    console.log("speeding up!!!")
    frameRateAnim = 100
    //snake1.snakeHead1.anims.setTimeScale(100)
})

socket.on('growth', function(data) {
    if(data.socketid == socketid){
        console.log("omega growing")
        snake1.grow(1)
        setTimeout(function(){
          snake1.grow(1)
        }, 150)
    } else {
        var temp = otherSnakes[data.playerNum]
        temp.grow(1)
        setTimeout(function(){
          temp.grow(1)
        }, 150)
        console.log("other person mega grow")
    }
})


socket.on('shield', function(data) {
    console.log("shield!!!")
})


socket.on('wall', function(data) {
    console.log("wall breaker!!!")
})
socket.on('updateFlagCoords', function(data) {
  if(data[1] == "blue"){
    blueFollowing = ""
    blueFlag.setVelocity(0)
    blueFlag.setX(data[0][0]*32+16)
    blueFlag.setY(data[0][1]*32+16)
  } else {
    redFollowing = ""
    redFlag.setVelocity(0)
    redFlag.setX(data[0][0]*32+16)
    redFlag.setY(data[0][1]*32+16)
  }
})