class GameOverScreen {
        create(){
            game.stage.backgroundColor = "#434343";
            thisGameTimeLeft=180;
            // pig_kill(pig, this.smallpig, this.score_s_pig, this.show_score, this.pigss_alive, this.pigss_BG);
            caughtNumber=0;
            OXYGEN_NOW=500;
            var image1= game.add.image(game.width/2-200, game.height/2-300 ,'sausage');
            image1.anchor.set(0.5);
            var image2= game.add.image(game.width/2-200, game.height/2 -50,'flax');
            image2.anchor.set(0.5);
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
            // this.myHealth.reset();

            game.state.start("TitleScreen", true, false);
          }
        }
