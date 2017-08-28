let game;

window.onload = function(){

    game = new Phaser.Game(640, 960);

    game.state.add("Boot", Boot);
    game.state.add("Preload", Preload);
    //game.state.add("Titlescreen", TitleScreen);
    game.state.add("Playgame", PlayGame);
    //game.state.add("GameOverScreen", Gameoverscreen);
    //game.state.add("WinGame", WinGame);
    game.state.start("Boot", Boot);


}


class Boot{
    preload(){
        //this.game.load.image("loading", "assets/sprites/loading.png");

    }

    create(){

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start("Preload");
    }
}
