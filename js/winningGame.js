class WinningGame {
    create(){
            console.log("entered win game screen");

            // style: images, background, color
            game.stage.backgroundColor = "#434343";
            var image1= game.add.image(game.width/2 + 100, 230,'sausage');
            image1.anchor.set(0.5);
            var image2= game.add.image(game.width/2 + 100, 430,'flax');
            image2.anchor.set(0.5);
            var font = 'carrier_command';

            // winning statement
            var sausageNumber = caughtNumber * 3;
            var title = game.add.bitmapText(120, 100, font, "Good Job!", 40)
            var sausageResult = game.add.bitmapText(game.width/2-100, 230, font, sausageNumber, 40);
            var extinguishedBlaze = game.add.bitmapText(game.width/2-100, 430, font, "0", 50);
            var winningDescription = `You saved ${caughtNumber} piglets. \r\rThe farmer served them up\r\ras ${sausageNumber} sausages to you. \r\rEnjoy!`;
            var winningStory = game.add.bitmapText(60, 550, font, winningDescription, 18);
            winningStory.maxWidth = 540;

            //bottun
            const playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
            playButton.anchor.set(0.5);
            const tween = game.add.tween(playButton).to({
            width: 220,
            height:220
            }, 1500, "Linear", true, 0, -1);
            tween.yoyo(true);

            // reset game
            caughtNumber=0;
            OXYGEN_NOW=500;
            thisGameTimeLeft = 180;
    }

    startGame(){
        game.state.start("TitleScreen", true, false);

    }
}
