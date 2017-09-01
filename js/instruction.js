//Watson's section
// because one screen is too small for both storyline and instruction
// so he breaks them into two seperate game state
class Instruction{
	create(){
          // style: image, color and background
          game.stage.backgroundColor = "#434343";
          var piglet = game.add.image(game.world.width / 2 + 100, game.world.height - 250, "piglet");
          piglet.maxWidth = game.world.width - 200;
          var firefighterPixel = game.add.image(-30, game.world.height - 300, "firefighterPixel");
          var font = 'carrier_command';
          
          // instruction text
          var instructionText = "Instruction\r\r\r\r1. Use arrows to move \r\r   shift to run\r\r2. Use spacebar to \r\r   extinguish blaze \r\r3. Pay attention to your \r\r   oxygen volume \r\r4. Stay away from fire\r\r5. Recover yourself \r\r   around the fire truck\r\r6. Take piglets out of \r\r   the barn or they die \r\r   with you.  ";
          var instruction = game.add.bitmapText(50, 100, font, instructionText, 18)
          instruction.maxWidth = game.world.width - 60;

          //button
          var rescuePig = game.add.bitmapText(game.width / 2 - 150, game.height - 300, font, "Go Rescue Now!", 20);
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