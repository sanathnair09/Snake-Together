const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const {walls, blueBase, redBase} = require('./backend/map.js')

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var gameIDs = [uuidv4()]
var games = [
  []//game 1, has list of players in class player form
]
var gameNum = 0
var startingPos = [
  [[5,17,0,""], [4,17,0,""], [3,17,0,""], [2,17,0,""], [1,17,0,""]], 
  [[5,18,0,""], [4,18,0,""], [3,18,0,""], [2,18,0,""], [1,18,0,""]], 
  [[5,19,0,""], [4,19,0,""], [3,19,0,""], [2,19,0,""], [1,19,0,""]], 
  [[57,2,180,""], [58,2,180,""], [59,2,180,""], [60,2,180,""], [61,2,180,""]], 
  [[57,3,180,""], [58,3,180,""], [59,3,180,""], [60,3,180,""], [61,3,180,""]],
  [[57,4,180,""], [58,4,180,""], [59,4,180,""], [60,4,180,""], [61,4,180,""]]
]
var applePos = []
var wallPos = []
var walls2 = []
var newFlagPos = [[2,10], [61,10]]
var flagPos = []
var newApplePos = randomStartingApples()
var startingPowerupPos = randomStartingPowerups()
var powerupPos = []

function randomStartingApples(){
    return [placeApple(),placeApple(),placeApple(),placeApple(),placeApple(),placeApple(),placeApple()]
}
function randomStartingPowerups(){
    var temp = []
    var options = ['speed', 'growth', 'wall', 'shield']
    var x=0
    while(x <7){
        temp.push(placePowerup(options[Math.floor(Math.random() * options.length)]))
        x++;
    }
    return temp
}


// applePos.push(JSON.parse(JSON.stringify(newApplePos)))
// powerupPos.push(JSON.parse(JSON.stringify(startingPowerupPos)))
// wallPos.push(JSON.parse(JSON.stringify(walls)))
flagPos.push(JSON.parse(JSON.stringify(newFlagPos)))

applePos.push(newApplePos)
powerupPos.push(startingPowerupPos)
wallPos.push(walls)
//flagPos.push(newFlagPos)

class Player{
  constructor(socketid, teamSide, startingPos, playerNum){
    this.socketid = socketid
    this.teamSide = teamSide
    this.startingPos = startingPos
    this.playerPosition = startingPos
    this.playerNum = playerNum
    this.hasFlag = false
    this.shield = 0
  }
}

function checkCollision(player, game, gameNum){
  var playerTeam = player.teamSide
  var collidablePlayers = []
  var playerHead = [player.playerPosition[0][0], player.playerPosition[0][1]]
  var killedPlayers = []
  for(var players of game){
    if(players.teamSide != playerTeam){
      collidablePlayers.push(players)
    }
  }
  for(var otherplayer of collidablePlayers){
    for(var position of otherplayer.playerPosition){
      if(position[0] == playerHead[0] && position[1] == playerHead[1]){
        killedPlayers.push(player)
        if(position[0]==otherplayer.playerPosition[0] && position[1]==otherplayer.playerPosition[1]){
          killedPlayers.push(otherplayer)
        }
      }
    }
  }
  for(var wall of wallPos[gameNum][playerHead[1]]){
    if(wall == playerHead[0]){
      killedPlayers.push(player)
    }
  }
  return killedPlayers
}

function checkApple(player, gameNum, socket){
  var playerHead = [player.playerPosition[0][0], player.playerPosition[0][1]]

  for(var a=0; a<applePos[gameNum].length; a++){
    var apple = applePos[gameNum][a]
    if(apple[0] == playerHead[0] && apple[1] == playerHead[1]){
      applePos[gameNum][a] = placeApple()
      io.to(gameIDs[gameNum]).emit('updateApple', [player, applePos[gameNum]])
    }
  }
}
function checkWin(player, gameNum, socket){
  var playerHead = [player.playerPosition[0][0], player.playerPosition[0][1]]
  var playerTeam = player.teamSide

  if(player.teamSide == 1){
    var zone = blueBase
    var winner = "Blue Wins!"
  } else {
    var zone = redBase
    var winner = "Red Wins!"
  }
  if(playerHead[1]>8 && playerHead[1] < zone.length+8){
    for(var row of zone[playerHead[1]-8]){
      if(row == playerHead[0]){
        console.log(winner)
        io.in(gameIDs[gameNum]).emit('win', winner)
      }
    }
  }
}
function checkFlagPickup(player, gameNum, socket){
  var playerHead = [player.playerPosition[0][0], player.playerPosition[0][1]]
  var playerTeam = player.teamSide

  if(player.teamSide == 2){
    var side = "blue"
    var flag = flagPos[gameNum][0]
  } else {
    var side = "red"
    var flag = flagPos[gameNum][1]
  }
  if(flag[0] == playerHead[0] && flag[1] == playerHead[1]){
    io.in(gameIDs[gameNum]).emit('updateFlagPerson', [player, side])
    player.hasFlag = true
  }
}

function checkPowerupCollision(player, gameNum, socket){
    var playerHead = [player.playerPosition[0][0], player.playerPosition[0][1]]
    for(var a=0; a<powerupPos[gameNum].length; a++){
        var powerUp = powerupPos[gameNum][a]
        if(powerUp[0] == playerHead[0] && powerUp[1] == playerHead[1]){
            io.to(gameIDs[gameNum]).emit(powerUp[2], player)
            console.log(powerUp[2])
            if(powerUp[2] == "shield"){
              
              player.shield += 40
              console.log(player.shield)
            }
            powerupPos[gameNum][a] = placePowerup(powerUp[2])
            io.to(gameIDs[gameNum]).emit('updatePowerup', powerupPos[gameNum])
        }
    }
}

function placeApple() {
    var coords;
    while(coords == null){
        var x = Math.floor(Math.random() * 62) + 1
        var y = Math.floor(Math.random() * 20) + 1
        var check = checkWall([x,y])
        if(!check[0]){
            coords = [x, y]
        }
    }
    return coords;
}

function placePowerup(name){
    var coords;
    while(coords == null){
        var x = Math.floor(Math.random() * 62) + 1
        var y = Math.floor(Math.random() * 20) + 1
        var check = checkWall([x,y])
        if(!check[0]){
            if(applePos[gameNum] == null){
                for(var a=0; a<newApplePos[gameNum].length; a++){
                    if(!arrayEquals(newApplePos[gameNum][a], [x,y])){
                        coords = [x, y]
                    }else{
                        coords = null
                    }
                }
            }else{
               for(var a=0; a<applePos[gameNum].length; a++){
                if(!arrayEquals(applePos[gameNum][a], [x,y])){
                    coords = [x, y]
                }else{
                    coords = null
                }
            }   
            }
              
        }
    }
    coords.push(name)
    return coords;
}

function arrayEquals(a, b) {
    if (a.length != b.length) {
        return false
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true;
}

function checkWall(loc) {
    var onWall = false;
    var pos = []
    for(var y=0;y<walls.length;y++){
        for(var x=0; x<walls[y].length;x++){
            var wall = [walls[y][x], y]
            walls2.push(wall);
        }
    }
    for(var i=0; i<walls2.length;i++){
        if(arrayEquals(walls2[i], loc)){
            onWall=true
            pos = (walls2[i])
            // console.log(loc +" is on a wall")
            // console.log(onWall)
            return [onWall,pos]
        }
    }
    return [onWall,pos]
}




function checkGameFull(io, socket){
  io.in(gameIDs[gameIDs.length-1]).emit('gameStarted', "sever started the game")
  games.push([])
//   applePos.push(JSON.parse(JSON.stringify(newApplePos)))
//   powerupPos.push(JSON.parse(JSON.stringify(startingPowerupPos)))
//   wallPos.push(JSON.parse(JSON.stringify(walls)))
    flagPos.push(JSON.parse(JSON.stringify(newFlagPos)))
    applePos.push(newApplePos)
    powerupPos.push(startingPowerupPos)
    wallPos.push(walls)
    //flagPos.push(newFlagPos)
  gameNum += 1
  gameIDs.push(uuidv4())
}

//app.set('port', 8000);
app.use('/static', express.static(__dirname + '/static'));

io.on('connection', socket=> {
  socket.on('startGame', (data) => {
      newApplePos = randomStartingApples()
      startingPowerupPos = randomStartingPowerups()
    checkGameFull(io, socket)
  })
  socket.on('begin_chat', (data) => {
      
    //check with team the player should be on
    var playerNum = games[gameNum].length
    if(playerNum > 2){
      var teamSide = 2
    } else {
      var teamSide = 1
    }
    //find other players already in the game
    var otherPlayers = games[gameNum]
    
    //create new Player
    var newPlayer = new Player(socket.id, teamSide, startingPos[playerNum], playerNum)
    //send to player their info 
    socket.emit('recieveData', [gameIDs[gameIDs.length-1], otherPlayers, newPlayer, applePos[gameNum], wallPos[gameNum], blueBase, redBase, flagPos[gameNum], powerupPos[gameNum]])
    socket.join(gameIDs[gameIDs.length-1]);
    //add player to list
    games[gameNum].push(newPlayer)
    
    //tell other players that a player joined
    io.to(gameIDs[gameIDs.length-1]).emit('addPlayer', newPlayer)

    //check if game room is full
    if(games[gameNum].length >= 6){
      checkGameFull(io, socket)
    }
  })
  socket.on('sendPositon', (data) => {
    //gameid, playerid, position
    try{
      var gameNum = gameIDs.indexOf(data[0])
      var game = games[gameNum]
      var player = game[data[1]]
      player.playerPosition = data[2]

      socket.broadcast.to(data[0]).emit('recievePosition', [data[1], data[2]])
      if(player.shield == 0){
        io.to(data[0]).emit('dead', checkCollision(player, game, gameNum))
      } else {
        player.shield -= 1
      }
      
      checkApple(player, gameNum, socket)
      checkPowerupCollision(player, gameNum, socket)
      checkFlagPickup(player, gameNum, socket)
      if(player.hasFlag){
        checkWin(player, gameNum, socket)
      }
    } catch(err) {
      console.log(err)
    }
  })
  socket.on('updateFlagPosition', (data) => {
    //gameid, playerid, flagcolor(0 for blue, 1 for red)
    var gameNum = gameIDs.indexOf(data[0])
    var game = games[gameNum]
    var player = game[data[1]]
    if(player.hasFlag){
      console.log("someone died with the flag!")
      flagPos[gameNum][data[2]] = [player.playerPosition[1][0], player.playerPosition[1][1]]
      if(player.teamSide == 1){
        var color = "red"
      } else {
        var color = "blue"
      }
      io.to(data[0]).emit('updateFlagCoords', [flagPos[gameNum][data[2]], color])
      player.hasFlag = false
    }
  })
})

require('./backend/routes')(app);


// Starts the server.
server.listen(8000, function() {
  console.log('Starting server on port 8000');
});
