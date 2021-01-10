class WaitingScene extends Phaser.Scene {
    
    constructor(){
        super({key: "WaitingScene"});
        this.userGameSpeed = 5;
    }
    preload(){
        this.load.image("snakeHead1", "/static/phaser/assets/snakeHead2.png");
        this.load.image("snakeBody", "/static/phaser/assets/snakeBody.png");
        this.load.image("snakeTail1", "/static/phaser/assets/snakeTail.png");
        this.load.image("snake", "/static/phaser/assets/snake.png");
        this.load.image("apple", "/static/phaser/assets/apple.png");
        // powerups

        this.load.image("speed", "/static/phaser/assets/speed-powerup.png");
        this.load.image("wall", "/static/phaser/assets/wall-powerup.png");
        this.load.image("shield", "/static/phaser/assets/shield-powerup.png");
        this.load.image("growth", "/static/phaser/assets/apple-powerup.png");

        //flag
        this.load.image("blueFlag", "/static/phaser/assets/blue-flag.png")
        this.load.image("redFlag", "/static/phaser/assets/red-flag.png")
    }

    create(){
        const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.rectangle(centerX, centerY, 1280, 704, INTRO_BLUE)
        
        // for(var x=17; x < 22; x++){
        //     for(var y=0; y < 40; y++){
        //         if (y%2 == 0 && x%2 == 0) {
        //             this.add.rectangle(16+y*32, 16+x*32, 32, 32, DARK_GREEN);
        //         }
        //         else {
        //             this.add.rectangle(16+y*32, 16+x*32, 32, 32, LIGHT_GREEN)

        //             if(x % 2 != 0 && y % 2 != 0){
        //                 this.add.rectangle(16+y*32, 16+x*32, 32, 32, DARK_GREEN)
        //             }
        //         }   
        //     }
        // }

        // this.add.image(5*32+16,18*32+16, 'snakeHead1');
        // this.add.image(4*32+16,18*32+16, 'snakeBody');
        // this.add.image(3*32+16,18*32+16, 'snakeBody');
        // this.add.image(2*32+16,18*32+16, 'snakeTail1');

        
        // var snake1 = this.add.image(25*32+16,20*32+16, 'snakeHead1');
        // snake1.flipX = true
        // var snake2 = this.add.image(26*32+16,20*32+16, 'snakeBody');
        // snake2.flipX = true
        // var snake3 = this.add.image(27*32+16,20*32+16, 'snakeBody');
        // snake3.flipX = true
        // var snake4 = this.add.image(28*32+16,20*32+16, 'snakeTail1');
        // snake4.flipX = true

        // var snake1 = this.add.image(35*32+16,19*32+16, 'snakeHead1');
        // snake1.flipX = true
        // var snake2 = this.add.image(36*32+16,19*32+16, 'snakeBody');
        // snake2.flipX = true
        // var snake3 = this.add.image(37*32+16,19*32+16, 'snakeBody');
        // snake3.flipX = true
        // var snake4 = this.add.image(38*32+16,19*32+16, 'snakeTail1');
        // snake4.flipX = true

        // this.add.image(20*32+16,17*32+16, "apple")
        // this.add.image(5*32+16,22*32+16, "apple")
        // this.add.image(20*32+16,19*32+16, "growth")
        // this.add.image(15*32+16,18*32+16, "wall")
        // this.add.image(7*32+16,19*32+16, "shield")
        // this.add.image(1*32+16,18*32+16, "growth")
        // this.add.image(11*32+16,20*32+16, "shield")
        // this.add.image(39*32+16,17*32+16, "growth")
        // this.add.image(17*32+16,18*32+16, "shield")
        // this.add.image(29*32+16,20*32+16, "wall")
        // this.add.image(25*32+16,20*32+16, "redFlag")

        waitingThis = this
        var waitingTitle = this.add.text(centerX,centerY, "Start Game?", {
            alignSelf: 'center',
            fontSize: 50,
            color: 'white',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontFamily: "Comic Sans MS",
        }).setOrigin(0.5)
        waitingTitle.setInteractive();
        waitingTitle.on('pointerdown', () => {
          startForEveryone()
        });
        

        startWaitingText = this.add.text(centerX, centerY+50, playerCount+"/6", {
            alignSelf: 'center',
            fontSize: 30,
            color: 'white',
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontFamily: "Comic Sans MS",
        }).setOrigin(0.5)
        startWaitingText.setInteractive();
        startWaitingText.on('pointerdown', () => {
            console.log("random code generated")
        })
    }
}