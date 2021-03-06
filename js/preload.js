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
        game.load.image("sausage", "assets/sprites/saussage.png");
        game.load.image("flax", "assets/sprites/flax.png");

        //Kevin's section: image, spritesheet & text
        game.load.image("water", "assets/sprites/split.png");
        game.load.image("hidden", "assets/sprites/water.png");
        game.load.image("smoke", "assets/sprites/smoke.png");
        game.load.image("background", "assets/sprites/green.png");
        game.load.image("topback", "assets/sprites/top_pic1.jpg");
        game.load.image("p_head", "assets/sprites/pig_head.png");
        game.load.image("ton", "assets/sprites/weight.png");
        game.load.spritesheet("fighter","/assets/sprites/firefighter.png", 40, 42, 18);
        game.load.spritesheet("fire","/assets/sprites/fire_imgs.png",112, 114, 24);
        game.load.spritesheet("s_pigs", "/assets/sprites/all-red-pig.png",80, 62, 12);
        // game.load.spritesheet("s_pigs_up", "/assets/sprites/red_pig_vertical.png", 54, 76, 3);

        game.load.atlasJSONHash('s_pigv', '/assets/sprites/red-pig-2.png', '/assets/sprites/red-pig-2-update.json');
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
        //////////////// Watson's section /////////////////////////
        game.load.spritesheet("wall", "/assets/sprites/wall.png", 32, 32);
        game.load.spritesheet("deadFirefighter", "/assets/sprites/deadFirefighter.png", 256, 256);
        game.load.spritesheet("fence", "/assets/sprites/fence.png", 32, 32);
        game.load.spritesheet("fence2", "/assets/sprites/fence2.png", 32, 32);
        game.load.spritesheet("fence3", "/assets/sprites/fence3.png", 32, 32);
        game.load.spritesheet("roof", "/assets/sprites/roof.png", 32, 32);
        game.load.spritesheet("firefighterPixel", "/assets/sprites/firefighterPixel.png", 256, 256);
        game.load.spritesheet("farmer", "/assets/sprites/farmer.png", 64, 64);
        game.load.spritesheet("piglet", "/assets/sprites/piglet.gif_c200", 256, 256);
        game.load.spritesheet("westRoof", "/assets/sprites/westRoof.png", 32, 32);
        game.load.spritesheet("eastRoof", "/assets/sprites/eastRoof.png", 32, 32);
        game.load.image("pigBeggingRescue", "/assets/sprites/pigBeggingRescue.png");
        game.load.image("grilledSausage", "/assets/sprites/grilledSausage.png");
        game.load.image("fireTruck", "/assets/sprites/fireTruck.png", 128, 128);
        game.load.image("barn", "/assets/sprites/barn.png");
    }


    create(){
        game.state.start("TitleScreen");

    }

}
