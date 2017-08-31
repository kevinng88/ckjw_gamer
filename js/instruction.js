//Watson's section
// because one screen is too small for both storyline and instruction
// so he breaks them into two seperate game state
class Instruction{
	create(){
          game.stage.backgroundColor = "#434343";
          var barn = game.add.image(game.world.width /2 - 120, 20, "piglet");
          barn.maxWidth = game.world.width - 200;
          var instructionText = "Use arrows to move \r\rUse spacebar to extinguish fire \r\rPay attention to your oxygen volumn \r\rAvoid staying over fire to save oxygen"
          var instruction = game.add.bitmapText(60, 300, 'carrier_command', instructionText, 20)
          instruction.maxWidth = game.world.width - 60;
          var bmpText= game.add.bitmapText(50, game.world.height - 280, 'carrier_command', 'Rescue pigs!', 35);
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
           game.state.start("PlayGame");
    }

}