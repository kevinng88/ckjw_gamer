class TitleScreen {
    create(){
      //  Jimmy's section: background color
          game.stage.backgroundColor = "#434343";
      //  Jimmy's section: background image
          var barn = game.add.image(30, 20, "barn");
          barn.maxWidth = game.world.width - 200;
          var storyText = "Go save poor piglets from a barn on fire. The farmer would be thankful to your brave deed!"
          var storyline = game.add.bitmapText(60, game.world.height / 2, 'carrier_command', storyText, 20)
          storyline.maxWidth = game.world.width - 60;
          var bmpText= game.add.bitmapText(50, game.world.height - 280, 'carrier_command', 'How to play!', 30);
      //  Jimmy's section: playbutton
          var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
          playButton.anchor.set(0.5);
          var tween = game.add.tween(playButton).to({
            width: 100,
            height: 100
          }, 1500, "Linear", true, 0, -1);
          tween.yoyo(true);
    }
    startGame(){
           console.log("playButton pressed");
           game.state.start("Instruction");
    }
}
