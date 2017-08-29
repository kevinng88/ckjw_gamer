class Preload{

    ////////////////////preload section//////////////////////////////////
    //anything need to preload can add here. Everyone can edit, just never delete others!

    preload(){
        //////////////original loading bar////////////////
        // var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
        // loadingBar.anchor.setTo(0.5,0.5);
        // game.load.setPreloadSprite(loadingBar);
        // Jimmy's section: background image
        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        // Jimmy's section: playbutton
        game.load.image("playbutton", "assets/sprites/playbutton.png");
        game.load.spritesheet("fighter","/assets/sprites/firefighter.png", 37, 45, 18);
        game.load.spritesheet("fire","/assets/sprites/fire_imgs.png",112, 114, 24);
        game.load.spritesheet("s_pigs", "/assets/sprites/red_pig.png",80, 62, 12);

    }

    create(){
    //  Jimmy's section: background color
        game.stage.backgroundColor = "#434343";
    // Jimmy's section: background image
        bmpText= game.add.bitmapText(10, 100, 'carrier_command', 'Start Game !', 34);
    // Jimmy's section: playbutton
        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);
        var tween = game.add.tween(playButton).to({
    			width: 220,
    			height:220
    		}, 1500, "Linear", true, 0, -1);
    		tween.yoyo(true);
    //     game.state.start("Titlescreen");


    }
    startGame(){
        game.state.start("Playgame");
    }

}
