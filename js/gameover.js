class GameOverScreen {
    create(){
        console.log("enter lose game screen");

        // style: images, background, color
        game.stage.backgroundColor = "#434343";
        var image1= game.add.image(game.width/2 - 64, 300,'deadFirefighter');
        image1.anchor.set(0.5);
        var font = 'carrier_command';

        // winning statement
        var sausageNumber = caughtNumber * 3;
        var title = game.add.bitmapText(120, 100, font, "YOU LOSE!", 40)
        var sausageResult = game.add.bitmapText(game.width/2-100, 230, font, sausageNumber, 40);
        var extinguishedBlaze = game.add.bitmapText(game.width/2-100, 430, font, fireScore, 50);
        var losingDescription = `You die,\r\ralthough you saved \r\r${this.score_s_pig} piglets.`;
        var losingStory = game.add.bitmapText(60, 550, font, losingDescription, 18);
        losingStory.maxWidth = 540;

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
        fireScore=0;
        this.score_s_pig=0;
        PIG_DIED_DUE_TO_FIRE = 0;
    }

    startGame(){
        // this.myHealth.reset();
        game.state.start("TitleScreen", true, false);
    }
}
