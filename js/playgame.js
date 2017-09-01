const FIREMAN_WALK_SPEED = 100;
const FIREMAN_RUN_SPEED = FIREMAN_WALK_SPEED * 1.5;
const SMALL_PIG_SPEED = 80;
const BIG_PIG_SPEED = SMALL_PIG_SPEED * 0.7;

const FIREMAN_CONSUME_OXYGEN = 20; // decrease per 3 seconds
const SMALL_PIG_CONSUME_OXYGEN = 5;
const BIG_PIG_CONSUME_OXYGEN = SMALL_PIG_CONSUME_OXYGEN  * 2;
const SMALL_PIG_COUNT = 5;
const BIG_PIG_COUNT = 3;
const FIRE_COUNT = 5;
let PIG_HEALTH = 50;
const PIG_HIT_FIRE_HURT = 1;
let OXYGEN_STARTING_VOLUMN = 500;
const GET_HIT_FIRE = 1;
const SPEED_ADD_PIG = 3000;
let timeLeft = 180;   /*temp kevin*/
let thisGameTimeLeft = timeLeft;
let caughtNumber = 0;
let OXYGEN_CONSUMPTION = FIREMAN_CONSUME_OXYGEN/* + SMALL_PIG_CONSUME_OXYGEN * caughtNumber + BIG_PIG_CONSUME_OXYGEN * BIG_PIG_COUNT*/;
//////////additional constants setting go here/////////////
const FTR_SCALE_X = 1.2;
const FTR_SCALE_Y = 1.2;
const SPIG_SCALE_X = 0.5;
const SPIG_SCALE_Y = 0.5;
const BPIG_SCALE_X = 1.2;
const BPIG_SCALE_Y = 1.2;
const FRE_SCALE_X = 0.8;
const FRE_SCALE_Y = 0.8;

/*temp kevin*/let OXYGEN_NOW = 500;

    // game.physics.startSystem(Phaser.Physics.ARCADE);  T1 ok
    // platforms = game.add.group(); T2 ok
    // platforms.enableBody = true; T3 ok
    // game.physics.arcade.enable(player); T4 ok
    // player.body.gravity.y = 0; T5 ok
    // player.body.collideWorldBounds = true; T6 ok
    // game.physics.arcade.collide(player, platforms); T7 ok

class PlayGame{

    create(){
        this.background = game.add.tileSprite(0,255,640,740,"background");
        this.background = game.add.tileSprite(0,0,640, 255,"topback");
        this.background.alpha = 0.9;

        game.physics.startSystem(Phaser.Physics.ARCADE); // T1
        this.firefighter = game.add.sprite(60, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = game.add.group();          //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
        this.bigpig = game.add.group();//game.add.sprite(100, 100, 's_pigv');  //[[test]]          //sprite: the big-size pig - have more energy to fire burnt, will consume more amount of oxygen when picked by fireman
        this.s_fire = game.add.group();          //sprite: the random fire on the map
        this.walls = game.add.group(); // T2
        this.b_fire = "";           //sprite: the big screen width fire on the bottom. Will going up on screen when time pass
        this.water_state = [];            //sprite: the fire fightering state
        this.weapon = game.add.weapon(60, 'water'); //weapon is the water
        this.weapon2 = game.add.weapon(2, 'hidden');
        this.score_s_pig = "";      //integer: number of small-size pig collected by firefighter
        this.score_b_pig = "";      //integer: number of big-size pig collected by firefighter
        this.show_score = game.add.text(100,100,"SMALL PIG COLLECTED: " + this.score_s_pig, {font: "30px webfont", fill: "#ff0044"});    //the text on top screen to show score
        game.stage.backgroundColor = '#337799';             //temp color to see effects
        //background music
        this.bgMusic = game.add.audio("background");
        this.bgMusic.loopFull(1);
        this.pigMusic = game.add.audio("pig");
        this.pigMusic.loopFull(0.2);
        this.fireMusic = game.add.audio("fire");
        this.fireMusic.loopFull(0.5);
        //////////additional variables go here/////////////
        this.icon = game.add.group();       //sprite: the icon


        //////////grobal physics setting///////////////
        game.physics.arcade.enable([this.firefighter, this.smallpig, this.bigpig, this.s_fire, this.weapon,this.walls], Phaser.Physics.ARCADE); // T4
        this.firefighter.enableBody = true;
        this.smallpig.enableBody = true;
        this.bigpig.enableBody = true;
        this.s_fire.enableBody = true;
        this.weapon2.enableBody = true;
        this.walls.enableBody = true; // T3



        //this.game.physics.arcade.enable(this.firefighter);
        // this.firefighter.physicsBodyType = Phaser.Physics.ARCADE;
        // this.smallpig.physicsBodyType = Phaser.Physics.ARCADE;
        // this.bigpig.physicsBodyType = Phaser.Physics.ARCADE;
        // this.s_fire.physicsBodyType = Phaser.Physics.ARCADE;
        // this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
        // this.walls.physicsBodyType = Phaser.Physics.ARCADE;





        /////////////////Ching's section////////////////////////////

       //Fireman Health Bar
        var healthBarBG = game.add.bitmapData(500,50); //create the red background of health bar
            healthBarBG.ctx.beginPath();
            healthBarBG.ctx.rect(0,0,500,50);
            healthBarBG.ctx.fillStyle = 'red';
            healthBarBG.ctx.fill();
        this.bglife = game.add.sprite(100,50, healthBarBG); // set the red health bar

        var healthBar = this.game.add.bitmapData(500, 50); //create the green health bar
            healthBar.ctx.beginPath();
            healthBar.ctx.rect(0,0, OXYGEN_STARTING_VOLUMN ,50);
            healthBar.ctx.fillStyle = "green";
            healthBar.ctx.fill();
        this.myHealth = game.add.sprite(100 ,50, healthBar); //set the green health bar

        game.time.events.loop(3000, this.updateOxygen , this); //loop every 3 second(3000ms) to decrease the oxygen-consumption (update in function updateOxygen)

        //Pig's Health Bar
        this.pigHealthRed = game.add.bitmapData(50,10);
            this.pigHealthRed.ctx.beginPath();
            this.pigHealthRed.ctx.rect(0,0,PIG_HEALTH,10);
            this.pigHealthRed.ctx.fillStyle = 'red';
            this.pigHealthRed.ctx.fill();

          this.pigHealthGreen = this.game.add.bitmapData(50, 10);
            this.pigHealthGreen.ctx.beginPath();
            this.pigHealthGreen.ctx.rect(0,0, PIG_HEALTH ,10);
            this.pigHealthGreen.ctx.fillStyle = "green";
            this.pigHealthGreen.ctx.fill();

        //Timer for whole game
        // this.time_finish_game = game.time.create(false);
        // this.time_finish_game.loop(1000, this.updateTimeLeft, this);
        // this.time_finish_game.start();


        ////////////////////////////////////////////////////////////




// //Jimmy's section
// // The sound of background, pig and fire occurs at the same time.
//
//
// // The sound occurs when fireman deletes the fire.
//         this.pigMusic.stop();
//         this.fireMusic.stop();
//         var deletefireSound = game.add.audio("deletefire");
// 	       deletefireSound.play();
// // The sound occurs when fireman hits the fire.
//         this.pigMusic.stop();
//         this.fireMusic.stop();
//         var hittingfireSound = game.add.audio("hittingfire");
// 	       hittingfireSound.play();
// // The sound occurs when fireman needs oxygen.
//         var needoxygenSound = game.add.audio("needoxygen");
// 	       needoxygenSound.play();
// // The sound occurs when fireman catchs the pig.
//         this.pigMusic.stop();
//         this.fireMusic.stop();
//         var gettingpigSound = game.add.audio("gettingpig");
// 	      gettingpigSound.play();
// // Game Over Sound.
//         this.bgMusic.stop();
//         this.pigMusic.stop();
//         this.fireMusic.stop();
//         var gameoverSound = game.add.audio("gameover");
// 	       gameoverSound.play();
// Game Over section
// Weapon
        ///this.weapon = game.add.weapon(30, 'water');      //by Kevin: Jimmy I move it up so that I can add physics
        this.weapon.bulletKillType= Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 1200;
        this.weapon.bulletSpeed=150;
        this.weapon.fireRate=10;
        this.weapon.ease = Phaser.Easing.Cubic.Out;
        this.weapon.bulletSpeedVariance = 20;
        this.weapon.bulletAngleVariance=10;
        this.weapon.bulletGravity.y = 200;

        this.weapon2.bulletKillType= Phaser.Weapon.KILL_LIFESPAN;
        this.weapon2.bulletLifespan = 1200;
        this.weapon2.bulletSpeed=150;
        this.weapon2.fireRate=2;
        this.weapon2.bulletGravity.y = 200;
        this.waterButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.getpig=true;
        this.hitfire=true;
        this.deletefire=true;
        this.needOxygen=true;
        //create hidden bullet




        ////////////////////////////////////////////////////////////


        /////////////////Kevin's section////////////////////////////

        //kevin's code here

        //-------------------group of small pigs------------------------//
        // currently each pig contains a 3 variable array [distance of x, distance of y,
        //direction in T/F], true is right, false is left
        this.pig_random_walk = {};
        this.pigss_BG = game.add.group();
        this.pigss_alive = game.add.group();

        for (var i = 0; i < SMALL_PIG_COUNT; i ++){
                var RANDOMX = game.world.randomX;
                var RANDOMY = game.world.randomY;
            //for group: use create instead of add.sprite
            this.smallpig.create(RANDOMX, RANDOMY, 's_pigs', 0);
            this.smallpig.children[i].anchor.setTo(SPIG_SCALE_X/2,SPIG_SCALE_Y);
            this.smallpig.children[i].scale.x = SPIG_SCALE_X;
            this.smallpig.children[i].scale.Y = SPIG_SCALE_Y;
            this.smallpig.children[i].body.velocity.x = game.rnd.integerInRange(-100,100);
            this.smallpig.children[i].body.velocity.y = game.rnd.integerInRange(-100,100);
            // this.pig_random_walk[i] = ([this.smallpig.children[i].x - game.rnd.integerInRange(0, 200),
            //     this.smallpig.children[i].x + game.rnd.integerInRange(0, 200), true]);
            this.pigHealthBG = game.add.sprite(RANDOMX, RANDOMY, this.pigHealthRed);
            this.pigss_BG.add(this.pigHealthBG);
            this.PigHealth = game.add.sprite(RANDOMX, RANDOMY, this.pigHealthGreen);
            this.pigss_alive.add(this.PigHealth);

        }
        //animate ALL pigs
        this.smallpig.callAll('animations.add', 'animations', 'walk', [0,1,2,3,4,5,6,7,8,9,10,11] , 50, true);
        //this.smallpig.callAll('animations.add', 'animations', 'up', [12] , 10, true);
       
        this.smallpig.callAll('animations.play', 'animations', 'walk');
        //--------------------------------------------------------------//

        //-------------------group of fire------------------------//


                for (var i = 0; i < 5; i ++){
                    //for group: use create instead of add.sprite
                    this.s_fire.create(game.world.randomX, game.world.randomY, 'fire', 0);
                    this.s_fire.children[i].anchor.setTo(FRE_SCALE_X/2,FRE_SCALE_Y/2);
                    this.s_fire.children[i].scale.x = FRE_SCALE_X;
                    this.s_fire.children[i].scale.Y = FRE_SCALE_Y;
                    this.water_state.push(false);
                    this.s_fire.children[i].setHealth(500);
                    this.s_fire.children[i].anchor.setTo(0.5,1);        //needed for making scale work
                }

                //set health of fire

                //animate ALL fire
                this.s_fire.callAll('animations.add', 'animations', 'burn', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] , 50, true);
                this.s_fire.callAll('animations.play', 'animations', 'burn');


                //--------------------------------------------------------------//



        //////// template of animation /////////////////
        //pig BURN animation
        //this.bigpig.animations.add("burn", [0,1]);
        //pig_burn(this.bigpig);

        //this.smallpig.add(300,300, 's_pigv', 0);



        //animate the firefighter
        this.firefighter.scale.x = FTR_SCALE_X;
        this.firefighter.scale.y = FTR_SCALE_Y;
        this.firefighter.anchor.setTo(FTR_SCALE_X/2,FTR_SCALE_Y/2);
        this.firefighter.animations.add('walk', [0,1,2,3,4,5],10, true);
        this.firefighter.animations.add('run', [0,1,2,3,4,5],30, true);
        this.firefighter.animations.add('up', [6,7,8,9,10,11],10, true);
        this.firefighter.animations.add('run-up', [6,7,8,9,10,11],30, true);
        this.firefighter.animations.add('down', [12,13,14,15,16,17],10, true);
        this.firefighter.animations.add('run-down', [12,13,14,15,16,17],30, true);




        //timer to make attack in good update rate
        this.attack = true;
        var timer = game.time.create(false);
        timer.loop(500,function(){if(this.attack){this.attack = false;}else{this.attack = true}},this)
        timer.start();

        //test fighter physics
        //this.firefighter.body.gravity.y = 100;

        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // ---------------- world bounds  ---------------- //
        // this.game.world.bounds = true;
        this.firefighter.body.collideWorldBounds = true; // T6
        this.smallpig.setAll('body.collideWorldBounds', true);
        this.firefighter.body.gravity.y = 0; //T5
        // -------------- wall impassible --------- //


        // keyboard control
        this.cursors = game.input.keyboard.createCursorKeys();
        //var waterKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        // ---------------- maze ------------------- //
        // first, gridify the whole map. each grid should be 32px wide thus the 640px-wide map is divided into 20 grid in width.
        var grid = game.world.width / 20;
        // because there are tens of walls, we had better build a group for it and set it having body with fewer lines
        // using array to store each wall position and size and then build them through a for loop
        // an element in this arrat consists of four required values and one optional value:
        // namely, [wall.x, wall.y, wall.scale.x, wall.scale.y, wallName(if any)]
        var wallPositionSize = [
          //the external wall
            [0, 7, 1, 23, "westWall"],[19, 7, 1.2, 23, "eastWall"],[0, 29, 22, 1, "southWall"],[0, 7, 10, 1, "leftNorthWall"],[12, 7, 10, 1, "rightNorthWall"],
            // interior wall - left top corner
            [6, 8, 1, 3],[9, 10, 1, 3],[3, 10, 1, 3],[3, 13, 7, 1],
            // interior - left mid
            [0, 16, 5, 1],[7, 14, 1, 5],[3, 19, 5, 1],
            //[0, 23, 1, 8],
            // interior - left bottom
            [6, 26, 4, 1],[3, 20, 1, 7],[6, 22, 1, 4],
            // interior center
            [8, 19, 4, 1],[9, 20, 1, 4],[10, 16, 6, 1],
            // interior - right bottom
            [9, 26, 1, 3],[12, 19, 1, 7],[12, 26, 5, 1],[15, 23, 4, 1],[12, 20, 5, 1],
            // interior - right top and mid
            [10, 10, 7, 1],[16, 11, 1, 3],[13, 13, 1, 4],[12, 13, 1, 1],[15, 17, 4, 1],
        ];

        for(var i = 0; i < wallPositionSize.length; i++){
          var wall = this.walls.create((wallPositionSize[i][0] * grid), (wallPositionSize[i][1] * grid), 'wall');
          wall.scale.setTo(wallPositionSize[i][2], wallPositionSize[i][3]);
          wall.body.immovable = true;
          game.physics.arcade.enable(wall);
        }


        ////////////////////////////////////////////////////////////
    }



    update(){

        //Please always console teammate to put conflicts to minimum///////
        // Watson's code /

        if (thisGameTimeLeft===0) {
          this.myHealth.width === 0;
          console.log("GAME Wins");
          game.time.events.stop();
          this.bgMusic.stop();
          this.pigMusic.stop();
          this.fireMusic.stop();
          var gameoverSound = game.add.audio("gameover");
          gameoverSound.play();
          game.state.start("WinningGame");
        }
        if (this.needOxygen && OXYGEN_NOW <= 250){
          this.needOxygen=false;
          var needoxygenSound = game.add.audio("needoxygen");
          needoxygenSound.onStop.add(function(){this.needOxygen = true;}, this);
          needoxygenSound.sound=0.5;
          needoxygenSound.play();
        }
        game.physics.arcade.collide(this.firefighter, this.walls, function(){
            console.log('the firefighter is hitting a wall');
        });






        //game.physics.arcade.collide(this.firefighter, this.walls);
        ////////////////Kevin's section/////////////////////////////
        game.physics.arcade.collide(this.smallpig, this.walls, function(pig, walls){
            //pig rotation
            pig.body.velocity.x = game.rnd.integerInRange(-100,100);
            pig.body.velocity.y = game.rnd.integerInRange(-100,100);
        });
        // this.smallpig.callAll('body.velocity.x', 0);
        // this.smallpig.callAll('body.velocity.y', 0);
        // game.physics.arcade.collide(this.bigpig, this.walls);
        // this.bigpig.body.velocity.x = 0;
        // this.bigpig.body.velocity.y = 0;


        game.physics.arcade.overlap(this.firefighter, this.smallpig, function(fighter, pig){

            //this function create the icon on top of figher
            pig_icon(this.firefighter, this.icon)

            //this function will kill 1 pig, then reset in another position, return the number of pig
            this.score_s_pig = pig_regeneration(pig, this.smallpig, this.score_s_pig, this.show_score, this.pigss_alive, this.pigss_BG);
            var gettingpigSound = game.add.audio("gettingpig");
            gettingpigSound.play();
        }, null, this);

        game.physics.arcade.overlap(this.smallpig, this.s_fire, function(pig, fire){
           //console.log("燒豬肉: " + this.smallpig.getIndex(pig) + "火: " + this.s_fire.getIndex(fire));
            pig_burn(pig);
            // console.log( this.pigss_alive.children[this.smallpig.getIndex(pig)].width - 0.1);
                if(PIG_HEALTH - PIG_HIT_FIRE_HURT < 0){
                        this.smallpig.children[this.smallpig.getIndex(pig)].kill();
                }
            //console.log( this.pigss_alive.children[this.smallpig.getIndex(pig)].width - 0.1);
                if(this.pigss_alive.children[this.smallpig.getIndex(pig)].width - PIG_HIT_FIRE_HURT < 0){
                        pig.kill();
                        this.pigss_alive.children[this.smallpig.getIndex(pig)].kill();
                        this.pigss_BG.children[this.smallpig.getIndex(pig)].kill();

                        pig_regeneration(pig, this.smallpig, this.score_s_pig, this.show_score, this.pigss_alive, this.pigss_BG);




                        console.log("PIG DIED DUE TO FIRE");
                } else if(this.pigss_alive.children[this.smallpig.getIndex(pig)].width >= 0){
                        return this.pigss_alive.children[this.smallpig.getIndex(pig)].width -= PIG_HIT_FIRE_HURT;
                }


        }, null, this)

        game.physics.arcade.overlap(this.firefighter, this.s_fire, function(fighter, fire){
            //console.log("---------:(((((-------get hit!", this.s_fire.getIndex(fire));
            man_burn(fighter);
            if (this.hitfire){
            this.hitfire = false;
            var hittingfireSound = game.add.audio("hitfire");
            hittingfireSound.onStop.add(function(){this.hitfire = true;}, this);
            hittingfireSound.volume=0.3;
            hittingfireSound.play();
          }
            if(OXYGEN_STARTING_VOLUMN - GET_HIT_FIRE < 0){
                        this.myHealth.destroy();
                        console.log("GAME OVER");
                        man_die(this.firefighter, this.background);
                        game.time.events.stop();
                        this.bgMusic.stop();
                        this.pigMusic.stop();
                        this.fireMusic.stop();
                        var gameoverSound = game.add.audio("gameover");
                        gameoverSound.play();
                        game.state.start("GameOverScreen");
                } else if(OXYGEN_NOW >= 0){
                        OXYGEN_NOW -= GET_HIT_FIRE;
                        this.myHealth.width = OXYGEN_NOW;
                };


        }, null, this)


        var wf = game.physics.arcade.overlap(this.weapon2.bullets, this.s_fire, function(weapon, fire){
            console.log("FIGHTING WATEEEEEEEEEEEEEEEEEEER!!!!!!!!", this.s_fire.getIndex(fire));


            var i = this.s_fire.getIndex(fire);
            this.water_state[i] = f_fighting(fire, this.water_state[i], this.attack, false);      //**TEMP CLOSE**


        }, null, this);




        // this.smallpig.forEach(function(m){

        //     var i = this.smallpig.getIndex(m);

        //     if(m.x < this.pig_random_walk[i][0]){
        //         this.pig_random_walk[i][2] = false;
        //     }
        //     else if (m.x > this.pig_random_walk[i][1])
        //     {
        //         this.pig_random_walk[i][2] =true;
        //     }

        //     if (this.pig_random_walk[i][2]){
        //         m.anchor.setTo(0.5,0.5);
        //         m.scale.x = -SPIG_SCALE_X;
        //         m.body.velocity.x = -SMALL_PIG_SPEED;
        //     }
        //     else{
        //         m.anchor.setTo(0.5,0.5);
        //         m.scale.x = SPIG_SCALE_X;
        //         m.body.velocity.x = SMALL_PIG_SPEED;
        //     }
        // },this, true)
        ////////////////////////////////////////////////////////////





        // Watson's code
          // fireman moving around
            this.firefighter.body.velocity.x = 0;
            this.firefighter.body.velocity.y = 0;

        if(this.cursors.up.isDown){
          if (this.cursors.up.shiftKey){
            //this.firefighter.y -= FIREMAN_RUN_SPEED;
            this.firefighter.animations.play('run-up');
            this.firefighter.body.velocity.y = -FIREMAN_RUN_SPEED;
          }
          //this.firefighter.y -= FIREMAN_WALK_SPEED;
          this.firefighter.animations.play('up');
          this.firefighter.body.velocity.y = -FIREMAN_WALK_SPEED;
          this.weapon.trackSprite(this.firefighter,30,-30,false);
          this.weapon.fireAngle = Phaser.ANGLE_UP;
          this.weapon2.trackSprite(this.firefighter,-30,30,false);
          this.weapon2.fireAngle = Phaser.ANGLE_UP;
        }else if(this.cursors.right.isDown){
            // console.log("right: ",FIREMAN_WALK_SPEED );
            this.firefighter.scale.x = FTR_SCALE_X;
            if(this.cursors.right.shiftKey){

            //this.firefighter.x += FIREMAN_RUN_SPEED;
            this.firefighter.animations.play('run');
            this.firefighter.body.velocity.x = FIREMAN_RUN_SPEED;

          }
           // this.firefighter.x += FIREMAN_WALK_SPEED;
         // this.firefighter.body.moveRight(FIREMAN_WALK_SPEED);
            this.firefighter.animations.play('walk');
            this.firefighter.body.velocity.x = FIREMAN_WALK_SPEED;
            this.weapon.trackSprite(this.firefighter,35,0,false);
            this.weapon.fireAngle = -30;//Phaser.ANGLE_RIGHT;
            this.weapon2.trackSprite(this.firefighter,35,0,false);
            this.weapon2.fireAngle = -30;
        }else if (this.cursors.down.isDown){
          if (this.cursors.down.shiftKey){
            //this.firefighter.body.moveDown(FIREMAN_RUN_SPEED);
            //this.firefighter.y += FIREMAN_RUN_SPEED;
            this.firefighter.animations.play('run-down');
            this.firefighter.body.velocity.y = FIREMAN_RUN_SPEED;
          }
          //this.firefighter.y += FIREMAN_RUN_SPEED;
          //this.firefighter.body.moveDown(FIREMAN_WALK_SPEED);
          this.firefighter.animations.play('down');
          this.firefighter.body.velocity.y = FIREMAN_WALK_SPEED;
          this.weapon.trackSprite(this.firefighter,25,105,false);
          this.weapon.fireAngle = Phaser.ANGLE_DOWN;
          this.weapon2.trackSprite(this.firefighter,25,105,false);
          this.weapon2.fireAngle = Phaser.ANGLE_DOWN;
        }else if (this.cursors.left.isDown){
            this.firefighter.scale.x = -FTR_SCALE_X;
          if(this.cursors.left.shiftKey){
            //this.firefighter.x -= FIREMAN_RUN_SPEED
            this.firefighter.animations.play('run');
            this.firefighter.body.velocity.x = -FIREMAN_RUN_SPEED;
          }
          //this.firefighter.x -= FIREMAN_WALK_SPEED;
          this.firefighter.animations.play('walk');
          this.firefighter.body.velocity.x = - FIREMAN_WALK_SPEED;
          this.weapon.trackSprite(this.firefighter,-30,0,false);
          this.weapon.fireAngle = 210;
          this.weapon2.trackSprite(this.firefighter,-30,0,false);
          this.weapon2.fireAngle = 210;
        }


          if (this.waterButton.isDown){
            if (this.deletefire){
            this.deletefire=false;
            var deletefireSound= game.add.audio("deletefire")
            deletefireSound.onStop.add(function(){this.deletefire = true;}, this);
            deletefireSound.sound=0.5;
            deletefireSound.play();
           }
            this.weapon.fire();
            this.weapon2.fire();
          }

          this.weapon.forEach(function(weapon) {
            weapon.scale.setTo(1.7,1.7);
          })


        //Ching's : update the health bar position of the pig



        for (var i = 0; i<SMALL_PIG_COUNT; i++){
                this.pigss_BG.children[i].x = this.smallpig.children[i].x - 40;
                this.pigss_BG.children[i].y = this.smallpig.children[i].y- 60;
                this.pigss_alive.children[i].x = this.smallpig.children[i].x -40;
                this.pigss_alive.children[i].y = this.smallpig.children[i].y -60;
        }




    ////////////////Additional classes go here/////////////////////////

            //Kevin update icons:
            if (this.icon.length > 0){
            for (i = 0; i < this.icon.length; i++){
                var o = this.icon.children[i];
                o.x = this.firefighter.x;
                o.y = this.firefighter.y - this.icon.getIndex(o)*15 - 30;
                }
            };



    }

    render(){
        game.debug.text("Time left: " + timeLeft, 32,32);
        game.debug.text("You are carrying "+ caughtNumber+ " of pig, so your oxygen consumption is "+ (OXYGEN_CONSUMPTION + SMALL_PIG_CONSUME_OXYGEN * caughtNumber), 32, 940);

    }

    updateOxygen(){
        if(this.firefighter.y > 240){
                if(OXYGEN_STARTING_VOLUMN - OXYGEN_CONSUMPTION - SMALL_PIG_CONSUME_OXYGEN*caughtNumber < 0){
                        this.myHealth.destroy();
                        console.log("GAME OVER");

                        game.time.events.stop();
                } else if(OXYGEN_STARTING_VOLUMN>= 0){
                        OXYGEN_STARTING_VOLUMN -= (OXYGEN_CONSUMPTION + SMALL_PIG_CONSUME_OXYGEN * caughtNumber);
                        // console.log("it now consume: ", OXYGEN_STARTING_VOLUMN);
                        return this.myHealth.width = OXYGEN_STARTING_VOLUMN;
                }
        } else if (this.firefighter.y<240 && this.myHealth.width >0){
                release_pig(this.firefighter, this.icon);
                caughtNumber = 0;
                if(this.myHealth.width + 30 > 500){
                    return this.myHealth.width = 500;
                }else if(this.myHealth.width <500){
                        OXYGEN_STARTING_VOLUMN += 30;
                        return this.myHealth.width = OXYGEN_STARTING_VOLUMN;
                }
                return OXYGEN_CONSUMPTION = 20;
        }
     }

     updateTimeLeft(){
        timeLeft -= 1;
     };


}



///////////////////////////Kevin's function///////////////////////////////////



function pig_burn(pig){
    pig.animations.play("burn", 10, true);
    game.add.tween(pig).from({tint : Math.random() * 0xffffff}, 1000, Phaser.Easing.Linear.None, true).chain(
        game.add.tween(pig).to({ tint : 0xffffff }, 10, "Linear", true)  // can't test out??
    ) ;
    game.add.tween(pig).to({y: pig.y - 50}, 500, Phaser.Easing.Circular.Out, true)
    game.add.tween(pig).to({y: pig.y + 50}, 1000, Phaser.Easing.Bounce.Out, true,500);
    //game.add.tween(pig).to({alpha: 0.5}, 1000, Phaser.Easing.Bounce.Out, true,2, true);

}

function f_fighting(fire, state, attack, destroy_fire) {

    console.log("health: "  + fire.health);
    //adding of smoke emmitter
    if (!destroy_fire && !state) {
        state = true;
        var s_emitter = game.add.emitter(fire.x + 100, fire.y + 200, 150);
        s_emitter.x = fire.x;
        s_emitter.y = fire.y - 120;
        s_emitter.makeParticles('smoke');
        s_emitter.setScale(0.01, 0.26, 0.01, 0.26, 800);
        s_emitter.gravity = -200;
        s_emitter.alpha = 0.4;
        s_emitter.setRotation(0, 10);


        game.add.tween(fire.scale).to({ y: 3, x: 1.5 }, 500, "Linear", true);
        s_emitter.start(false, 0, 0);
    }
   else if(state && attack) {
        fire.damage(1);
        game.add.tween(fire).to({tint: Math.random() * 0xffffff}, 500, "Linear", true,0,0,true).chain(
            game.add.tween(fire).to({ tint : 0xffffff }, 10, "Linear", true) );
        var sx = fire.scale.x - 0.05;
        var sy = fire.scale.y - 0.1;
        console.log("scale: ",sx,sy);
        game.add.tween(fire.scale).to({y: sy, x: sx },10, "Linear", true );
        var t = game.add.text(fire.x + 50, fire.y -100, fire.health);
        var grd = t.context.createLinearGradient(0, 0, 0, t.canvas.height);
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');
        t.fill = grd;
        var twn = game.add.tween(t);
        twn.to({y: fire.y -200},1000, "Linear", true);
        twn.to({alpha: 0},2000, "Linear", true)
        twn.onComplete.add(function(){
            t.destroy();
        }, this);

   }
    //else if()//2 sec later, heal to 100
    //    game.add.tween(fire.scale).to({ y: 1, x: 1.1 }, 500, "Linear", true);
        //s_emitter.destroy();
    //}
    //else{
        //fire.kill();
    //}

    return state;
}

function man_burn(man){
    
    game.add.tween(man).to({tint: Math.random() * 0xffffff}, 100, "Linear", true,0,0,true)
    .chain(game.add.tween(man).to({tint: 0xffffff},100, "Linear",true,100));
    
}

function pig_kill(pig, pig_grp, score, text, green_bar, red_bar){

    //use kill because the array actually won't change in length, only alive() switch to false
    pig.kill();

    score ++;
    // console.log(score);
    console.log("this pig is caught");
    caughtNumber += 1;
    // console.log("Number of pig caught: ",caughtNumber);

    text.setText("SMALL PIG COLLECTED: " + score);

    red_bar.children[pig_grp.getIndex(pig)].kill();
    green_bar.children[pig_grp.getIndex(pig)].kill();

    pig_regeneration(pig, pig_grp, score, text, green_bar, red_bar);

    return score;
}


function pig_regeneration(pig, pig_grp, score, text, green_bar, red_bar){

    //regenerate the pig again.....
    //////////////////////REGENERATE INTERVAL IS 1s to 7s)
    //for animation start (
    var t = game.rnd.integerInRange(1000, 7000);
    // console.log(t);
    // game.time.events.add(t, function () {
        var px = game.world.randomX;
        var py = game.world.randomY;
        pig.reset(px, py);
        red_bar.children[pig_grp.getIndex(pig)].reset(px, py);
        green_bar.children[pig_grp.getIndex(pig)].reset(px, py);
        game.add.tween(pig).from({ alpha: 0 }, 500, Phaser.Easing.Bounce.Out, true, t);
        game.add.tween(red_bar.children[pig_grp.getIndex(pig)]).from({alpha:0},500,Phaser.Easing.Bounce.Out,true,t);
        game.add.tween(green_bar.children[pig_grp.getIndex(pig)]).from({ alpha: 0 }, 500, Phaser.Easing.Bounce.Out, true, t);
    // }
    //     , this);
        console.log("one pig is regenerated");

    if (green_bar.children[pig_grp.getIndex(pig)].width !== 50) {
            return green_bar.children[pig_grp.getIndex(pig)].width = 50;
        }



}

function man_die(man, back){
        man.animations.stop();
        man.anchor.setTo(0,0);
        game.add.tween(man).to({angle: -90}, 1000, "Linear", true);
        game.add.tween(man.scale).to({x: 5, y: 5}, 2000, "Linear", true, 200);
        game.add.tween(man).to({x: game.world.centerX, y: game.world.centerY}, 2000, "Linear", true , 200);


        filter = game.add.filter('Fire', 800, 600);
        filter.alpha = 0.0;
        back.filters = [filter];
        game.add.tween(filter).to({alpha: 0.7}, 2000, "Linear", true);

        game.time.events.add(3000, function(){game.paused = true}, this);
        //game.paused
}

function pig_icon(man, icon){
    icon.create(man.x + 30, man.y - icon.length*15 -30, 'p_head', 0);
    //game.add.tween(icon).to({y:10}, 1000, "Linear", true, 0,-1, true);

    game.add.tween(icon.scale).to({x:1.1, y:1.1}, 1000, "Linear", true, 0,-1, true);
}

function release_pig(man, icon) {
    if (icon.length > 0) {
        var p;
        for (var i = 0; i < icon.length; i++) {
            p = game.add.sprite(game.rnd.integerInRange(game.world.centerX - 50, game.world.centerX + 50),
                game.rnd.integerInRange(200, 230), 's_pigs');
            p.scale.x = SPIG_SCALE_X;
            p.scale.y = SPIG_SCALE_Y;
            game.add.tween(p).to({ x: 500, y: 150 }, 1000, "Linear", true);
            p.y = 150;
            game.add.tween(p).to({ y: 120 }, 500, Phaser.Easing.Quartic.Out, true, 500, -1, true);

        }



        icon.destroy();
        console.log(icon);
    }

}


///////////////////////////////////////////////////////////////////////////////
