//Watson's section
// because one screen is too small for both storyline and instruction
// so he breaks them into two seperate game state
class Instruction{
	create(){
          game.stage.backgroundColor = "#434343";
          var barn = game.add.image(game.world.width /2 - 120, 40, "piglet");
          barn.maxWidth = game.world.width - 200;
          var instructionText = "1. Use arrows to move \r\r2. Use spacebar to \r\r   extinguish blaze \r\r3. Pay attention to your \r\r   oxygen volume \r\r4. Stay awat from fire\r\r5. Recover yourself around \r\r   the fire truck"
          // instructionText.lineSpacing = 20;
          var instruction = game.add.bitmapText(50, 400, 'carrier_command', instructionText, 18)
          instruction.maxWidth = game.world.width - 60;
          instruction.lineSpacing = 100;
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