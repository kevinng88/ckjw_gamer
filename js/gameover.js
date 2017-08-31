class GameOverScreen {
          create(){
            game.stage.backgroundColor = "#434343";
            var image= game.add.image(game.width/2, game.height/2 ,'sausage');
            image.anchor.set(0.5);
            // var bmpText1= game.add.bitmapText(game.width / 2, 50 , "font", "Small Pig Collected: ", 48).anchor.x = 0.5;
            // var bmpText2= game.add.bitmapText(game.width / 2, 150 , "font", score.toString(), 72).anchor.x = 0.5;
            const playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
            playButton.anchor.set(0.5);
            const tween = game.add.tween(playButton).to({
            width: 220,
            height:220
            }, 1500, "Linear", true, 0, -1);
            tween.yoyo(true);
            }
          startGame(){
            game.state.start("Boot");
            }
}
