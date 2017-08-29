class TitleScreen {
    create(){
      //  Jimmy's section: background color
          game.stage.backgroundColor = "#434343";
      //  Jimmy's section: background image
          var bmpText= game.add.bitmapText(80, 320, 'carrier_command', 'Start Game!', 40);
      //  Jimmy's section: playbutton
          var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
          playButton.anchor.set(0.5);
          var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
          }, 1500, "Linear", true, 0, -1);
          tween.yoyo(true);
    }
    startGame(){
           console.log("playButton pressed");
           game.state.start("PlayGame");
    }
}
