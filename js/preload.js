class Preload{

    ////////////////////preload section//////////////////////////////////
    //anything need to preload can add here. Everyone can edit, just never delete others!

    preload(){
        //////////////original loading bar////////////////
        // var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
        // loadingBar.anchor.setTo(0.5,0.5);
        // game.load.setPreloadSprite(loadingBar);
        // Jimmy's section: background image
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
        // Jimmy's section: playbutton
        game.load.image("playbutton", "assets/sprites/playbutton.png");

        // Jimmy's section: water image
        //game.load.image("water", "assets/sprites/water.png");


        //Kevin's section: image, spritesheet & text
        game.load.image("water", "assets/sprites/split.png");
        game.load.image("hidden", "assets/sprites/water.png");
        game.load.image("smoke", "assets/sprites/smoke.png");
        game.load.image("background", "assets/sprites/mud.png");
        game.load.image("topback", "assets/sprites/top_pic1.jpg");
        game.load.image("p_head", "assets/sprites/pig_head.png");
        game.load.image("ton", "assets/sprites/weight.png");
        game.load.spritesheet("fighter","/assets/sprites/firefighter.png", 37, 45, 18);
        game.load.spritesheet("fire","/assets/sprites/fire_imgs.png",112, 114, 24);
        game.load.spritesheet("s_pigs", "/assets/sprites/red_pig.png",80, 62, 12);
        game.load.spritesheet("wall", "/assets/sprites/wall.png", 32, 32);
        game.load.atlasJSONHash('s_pigv', '/assets/sprites/red-pig-2.png', '/assets/sprites/red-pig-2.json');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js');
        
        /////////////////Jimmy's section(audio)////////////////////////////
        game.load.audio("background", ["assets/sounds/background.mp3"]);
        game.load.audio("pig", ["assets/sounds/pig.mp3"]);
        game.load.audio("fire", ["assets/sounds/fire.mp3"]);
        game.load.audio("deletefire", ["assets/sounds/deletefire.mp3"]);
        game.load.audio("gameover", ["assets/sounds/gameover.mp3"]);
        game.load.audio("hitfire", ["assets/sounds/hitfire.mp3"]);
        game.load.audio("needoxygen", ["assets/sounds/needoxygen.mp3"]);
        game.load.audio("gettingpig", ["assets/sounds/gettingpig.mp3"]);
    }


    create(){
        //game.state.start("TitleScreen");
        game.state.start("PlayGame");
        
    }

}
