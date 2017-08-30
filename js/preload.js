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
        game.load.image("water", "assets/sprites/water.png");


        //Kevin's section: image, spritesheet & text
        game.load.image("smoke", "assets/sprites/smoke.png");
        game.load.spritesheet("fighter","/assets/sprites/firefighter.png", 37, 45, 18);
        game.load.spritesheet("fire","/assets/sprites/fire_imgs.png",112, 114, 24);
        game.load.spritesheet("s_pigs", "/assets/sprites/red_pig.png",80, 62, 12);
        game.load.spritesheet("wall", "/assets/sprites/wall.png");
        game.load.atlasJSONHash('s_pigv', '/assets/sprites/red-pig-2.png', '/assets/sprites/red-pig-2.json');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }


    create(){
        //game.state.start("TitleScreen");
        game.state.start("PlayGame")
    }

}
