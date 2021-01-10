

var gameRun = 4 //every 4 frames it moves a box
var gameRunning = 0 //what frame you are on rn
// var snakePos = [[5,1], [4,1], [3,1], [2,1]]
var snakePosMe = []
var snakeSize = 32;
var frameRateAnim = 30
var controls = []
var pastDirection = 2
var direction = 2
var snake1
var gameStarted = false;
var gameThis
var apples = []
var powerUps = []
var startWaitingText
var waitingThis
var wallArray = []
var blueBase = []
var redBase = []
var canMove = true
var blueFlag 
var redFlag
var blueFollowing
var redFollowing
var endText
//Game colors
var DARK_GREEN = 0x9bc853
var LIGHT_GREEN = 0xb1d560
var GRAY = 0x3c3c3c
var DARK_BLUE = 0x386bc9
var LIGHT_BLUE = 0x5e88d4
var DARK_RED = 0xb3291f
var LIGHT_RED = 0xc04944
var INTRO_BLUE = 0x53C2F7

var backgroundArray = []


var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 704,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  autoCenter: true,
  scene: [StartScene, GameScene, WaitingScene, EndScene]
}

var game = new Phaser.Game(config)

