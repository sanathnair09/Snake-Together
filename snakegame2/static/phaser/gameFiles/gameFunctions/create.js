function create() {
    //indicated game has started
    gameStarted = true;
    gameThis = this

    //set keys for current player
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    //background
    
    for(x=0; x < 22; x++){
        backgroundArray.push([])
        for(y=0; y < 64; y++){
            if (y%2 == 0 && x%2 == 0) {
                backgroundArray[x].push(this.add.rectangle(16+y*32, 16+x*32, 32, 32, DARK_GREEN));
            }
            else {
                var rect = this.add.rectangle(16+y*32, 16+x*32, 32, 32, LIGHT_GREEN)

                if(x % 2 != 0 && y % 2 != 0){
                    rect = this.add.rectangle(16+y*32, 16+x*32, 32, 32, DARK_GREEN)
                }
                backgroundArray[x].push(rect);
            }   
        }
        
    }
    //console.log(backgroundArray)
    for(var x=0; x<wallArray.length; x++){
      for(var y=0; y<wallArray[x].length; y++){
        backgroundArray[x][wallArray[x][y]].fillColor = GRAY;
      }
    }
    //console.log(blueBase)
    generateBase(DARK_BLUE, LIGHT_BLUE)
    generateBase(DARK_RED, LIGHT_RED)
    blueFlag = this.physics.add.image(getPlacement(flagPos[0][0], flagPos[0][1])[0],getPlacement(flagPos[0][0], flagPos[0][1])[1], "blueFlag")
    blueFlag.depth = 100;
    redFlag = this.physics.add.image(getPlacement(flagPos[1][0], flagPos[1][1])[0], getPlacement(flagPos[1][0], flagPos[1][1])[1], "redFlag")
    redFlag.depth = 100;


    //create all animations 
    this.anims.create({
        key: "snakeHead1Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteHead1"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeHead2Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteHead2"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeTail1Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteTail1"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeTail2Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteTail2"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeHeadCurve1Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteHeadCurve1"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeHeadCurve2Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteHeadCurve2"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeTailCurve1Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteTailCurve1"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeTailCurve2Anim",
        frames: this.anims.generateFrameNumbers("snakeSpriteTailCurve2"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeSpriteTailFreeze1",
        frames: this.anims.generateFrameNumbers("snakeSpriteTailFreeze1"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    this.anims.create({
        key: "snakeSpriteTailFreeze2",
        frames: this.anims.generateFrameNumbers("snakeSpriteTailFreeze2"),
        frameRate: frameRateAnim,
        repeat: 0
    });
    
    //create my snake
    snake1 = new Snake(myself.startingPos, this)
    snake1.snakeTail2.on('animationcomplete', function(){
      snake1.moveMySnake()
      snake1.updateSnake()
      sendPosition()
    });
    if(myself.teamSide == 2){
      snake1.pastDirection = 4
      snake1.direction = 4
    }

    //create other snakes
    for(var player of otherPlayers){
      if(player.socketid != socketid){
        addNewSnake(player)
      }
    }

    //create apples
    for(var apple of applePos){
      var newApple = new Apple(apple[0], apple[1])
      apples.push(newApple)
    }

    //create powerups
    for(var powerup of powerUpPos){
        var newPowerup = new Powerup(powerup[0], powerup[1], powerup[2])
        powerUps.push(newPowerup)
    }
    
    //set camera positions
    this.cameras.main.setBounds(0, 0, 2048, 704);
    this.cameras.main.startFollow(snake1.snakeHead1, true, 0.05, 0.05);
}

//add player once game has already started
function addPlayer(player){
  if(gameStarted){
    addNewSnake(player)
  }
}
//add another player snake
function addNewSnake(player){
  var otherSnake = new Snake(player.playerPosition, gameThis)
  otherSnake.snakeTail2.on('animationcomplete', function(){
      otherSnake.updateOtherSnake()
  });
  otherSnakes[player.playerNum] = (otherSnake)

}

function generateBase(color1, color2){
    if(color1 == DARK_BLUE){
        for(var i=8; i<14; i++){
            for(var j=0; j<blueBase[1].length;j++){
                if(i%2 == 0 && j%2 == 0){
                    backgroundArray[i][blueBase[1][j]].fillColor = color1
                }else{
                    backgroundArray[i][blueBase[1][j]].fillColor = color2

                    if(i%2 != 0 && j%2 !=0){
                        backgroundArray[i][blueBase[1][j]].fillColor = color1
                    }
                }  
            }
        }
    }else{
        for(var i=8; i<14; i++){
            for(var j=0; j<redBase[1].length;j++){
                if(i%2 == 0 && j%2 == 0){
                    backgroundArray[i][redBase[1][j]].fillColor = color1
                }else{
                    backgroundArray[i][redBase[1][j]].fillColor = color2

                    if(i%2 != 0 && j%2 !=0){
                        backgroundArray[i][redBase[1][j]].fillColor = color1
                    }
                }  
            }
        }
    }
    
}

function getPlacement(x,y){
    return [x*32+16, y*32+16]
}