class TitleScreen {
    create(){
      //  Jimmy's section: background color
          game.stage.backgroundColor = "#434343";
      //  Jimmy's section: background image
          var barn = game.add.image(30, 20, "barn");
          barn.maxWidth = game.world.width - 200;
          var storyText = "Go save poor piglets from\r\ra barn on fire. \r\rThe farmer would be thankful \r\rfor your brave deed!"
          var storyline = game.add.bitmapText(60, game.world.height / 2, 'carrier_command', storyText, 17)
          storyline.maxWidth = game.world.width - 60;
          var bmpText= game.add.bitmapText(90, game.world.height - 280, 'carrier_command', 'How to play!', 30);
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
