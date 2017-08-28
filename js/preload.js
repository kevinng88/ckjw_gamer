class Preload{

    ////////////////////preload section//////////////////////////////////
    //anything need to preload can add here. Everyone can edit, just never delete others!

    preload(){
        //////////////original loading bar////////////////
        // var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
        // loadingBar.anchor.setTo(0.5,0.5);
        // game.load.setPreloadSprite(loadingBar);


        game.load.spritesheet("fighter","/assets/sprites/firefighter.png", 37, 45, 18);
        game.load.spritesheet("fire","/assets/sprites/fire_imgs.png",112, 114, 24);
        game.load.spritesheet("s_pigs", "/assets/sprites/red_pig.png",80, 62, 12);
        game.load.spritesheet("s_pigs_ver", "/assets/sprites/red_pig_vertical.png",52, 25, 3);

    }

    create(){
        
    //     game.state.start("Titlescreen");
        game.state.start("Playgame");

    }

}