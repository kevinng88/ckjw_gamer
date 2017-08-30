const FIREMAN_WALK_SPEED = 10;
const FIREMAN_RUN_SPEED = FIREMAN_WALK_SPEED * 1.5;
const SMALL_PIG_SPEED = 0.5;
const BIG_PIG_SPEED = SMALL_PIG_SPEED * 1.5;

const FIREMAN_CONSUME_OXYGEN = 20; // decrease per 3 seconds
const SMALL_PIG_CONSUME_OXYGEN = 5;
const BIG_PIG_CONSUME_OXYGEN = SMALL_PIG_CONSUME_OXYGEN  * 2;
const SMALL_PIG_COUNT = 5;
const BIG_PIG_COUNT = 3;
let PIG_HEALTH = 50;
const PIG_HIT_FIRE_HURT = 0.2;
let OXYGEN_STARTING_VOLUMN = 500;
const SPEED_ADD_PIG = 3000;
const OXYGEN_CONSUMPTION = FIREMAN_CONSUME_OXYGEN + SMALL_PIG_CONSUME_OXYGEN * SMALL_PIG_COUNT + BIG_PIG_CONSUME_OXYGEN * BIG_PIG_COUNT;
//////////additional constants setting go here/////////////



class PlayGame{

    create(){
        this.firefighter = game.add.sprite(40, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = game.add.group();         //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
        this.bigpig = game.add.sprite(100, 100, 's_pigv');  //[[test]]          //sprite: the big-size pig - have more energy to fire burnt, will consume more amount of oxygen when picked by fireman
        this.s_fire = game.add.group();          //sprite: the random fire on the map
        this.b_fire = "";           //sprite: the big screen width fire on the bottom. Will going up on screen when time pass
        this.water = "";            //sprite: the water spread from firefighter
        this.weapon = game.add.weapon(30, 'water'); //weapon is the water
        this.score_s_pig = 0;      //integer: number of small-size pig collected by firefighter
        this.score_b_pig = "";      //integer: number of big-size pig collected by firefighter
        this.show_score = game.add.text(100,100,"SMALL PIG COLLECTED: " + this.score_s_pig, {font: "30px webfont", fill: "#ff0044"});    //the text on top screen to show score
        game.stage.backgroundColor = '#337799';             //temp color to see effects
        //////////additional variables go here/////////////

        //////////grobal physics setting///////////////
        game.physics.enable([this.firefighter, this.smallpig, this.bigpig, this.s_fire, this.weapon], Phaser.Physics.ARCADE);
        this.firefighter.enableBody = true;
        this.smallpig.enableBody = true;
        this.bigpig.enableBody = true;
        this.s_fire.enableBody = true;
        this.weapon.enableBody = true;
        this.firefighter.physicsBodyType = Phaser.Physics.ARCADE;
        this.smallpig.physicsBodyType = Phaser.Physics.ARCADE;
        this.bigpig.physicsBodyType = Phaser.Physics.ARCADE;
        this.s_fire.physicsBodyType = Phaser.Physics.ARCADE;
        this.weapon.physicsBodyType = Phaser.Physics.ARCADE;

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




        ////////////////////////////////////////////////////////////




        /////////////////Jimmy's section////////////////////////////
        game.load.audio("background", ["assets/sounds/background.mp3"]);
        game.load.audio("pig", ["assets/sounds/pig.mp3"]);
        game.load.audio("fire", ["assets/sounds/fire.mp3"]);
        game.load.audio("deletefire", ["assets/sounds/deletefire.mp3"]);
        game.load.audio("gameover", ["assets/sounds/gameover.mp3"]);
        game.load.audio("hittingfire", ["assets/sounds/hittingfire.mp3"]);
        game.load.audio("needoxygen", ["assets/sounds/needoxygen.mp3"]);
        game.load.audio("gettingpig", ["assets/sounds/gettingpig.mp3"]);
// The sound of background, pig and fire occurs at the same time.
        this.bgMusic = game.add.audio("background");
        this.bgMusic.loopFull(1);
        this.pigMusic = game.add.audio("pig");
        this.pigMusic.loopFull(1);
        this.fireMusic = game.add.audio("fire");
        this.fireMusic.loopFull(1);
// The sound occurs when fireman deletes the fire.
        this.fireMusic.stop();
        var deletefireSound = game.add.audio("deletefire");
	      deletefireSound.play();
// The sound occurs when fireman hits the fire.
        this.fireMusic.stop();
        var hittingfireSound = game.add.audio("hittingfire");
	      hittingfireSound.play();
// The sound occurs when fireman needs oxygen.
        var needoxygenSound = game.add.audio("needoxygen");
	      needoxygenSound.play();
// The sound occurs when fireman catchs the pig.
        this.pigMusic.stop();
        var gettingpigSound = game.add.audio("gettingpig");
	      gettingpigSound.play();
// Game Over Sound.
        this.bgMusic.stop();
        this.pigMusic.stop();
        this.fireMusic.stop();
        var gameoverSound = game.add.audio("gameover");
	      gameoverSound.play();
// Game Over section
// Weapon
        ///this.weapon = game.add.weapon(30, 'water');      //by Kevin: Jimmy I move it up so that I can add physics
        this.weapon.bulletKillType= Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed=1000;
        this.weapon.fireRate=100;
        this.weapon.trackSprite(this.firefighter,40,60,false);
        this.waterButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

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
            this.smallpig.children[i].scale.x = 2;
            this.smallpig.children[i].scale.Y = 2;
            this.pig_random_walk[i] = ([this.smallpig.children[i].x - game.rnd.integerInRange(0, 200),
                this.smallpig.children[i].x + game.rnd.integerInRange(0, 200), true]);
            this.pigHealthBG = game.add.sprite(RANDOMX, RANDOMY, this.pigHealthRed);
            this.pigss_BG.add(this.pigHealthBG);
            this.PigHealth = game.add.sprite(RANDOMX, RANDOMY, this.pigHealthGreen);
            this.pigss_alive.add(this.PigHealth);

        }
        //animate ALL pigs
        this.smallpig.callAll('animations.add', 'animations', 'walk', [0,1,2,3,4,5,6,7] , 10, true);
        this.smallpig.callAll('animations.play', 'animations', 'walk');
        //--------------------------------------------------------------//

        //-------------------group of fire------------------------//


                for (var i = 0; i < 5; i ++){
                    //for group: use create instead of add.sprite
                    this.s_fire.create(game.world.randomX, game.world.randomY, 'fire', 0);
                    this.s_fire.children[i].scale.x = 1.2;
                    this.s_fire.children[i].scale.Y = 1.2;

                }
                //animate ALL fire
                this.s_fire.callAll('animations.add', 'animations', 'burn', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] , 50, true);
                this.s_fire.callAll('animations.play', 'animations', 'burn');


                //--------------------------------------------------------------//



        //////// template of animation /////////////////
        //pig animation
        this.bigpig.animations.add("burn", [0,1]);
        pig_burn(this.bigpig);

        // [[testing when fire fighting]] //
        //f_fighting(this.s_fire.children[2], false);
       //f_fighting(this.s_fire.children[3], false);


        //this.smallpig.add(300,300, 's_pigv', 0);



        //animate the firefighter
        this.firefighter.scale.x = 1.5;
        this.firefighter.scale.y = 1.5;
        this.firefighter.animations.add('walk');
        this.firefighter.animations.play('walk', 50, true);






        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // ---------------- physics  ---------------- //
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // ---------------- world bounds  ---------------- //
        game.world.collideWorldBounds = true;
        // ---------------- Wall ---------------- //

        // this.walls = game.add.group();
        // this.walls.enableBody = true;
        // this.walls.setAll('body.immovable', true);
        // this.walls.setAll('tint', 0x963103);


        // var bottomWall = this.walls.create(0, game.world.height - 30, "bottomWall");
      
        // walls = game.add.group();
        // walls.enableBody = true;
        // this.walls.setAll('body.immovable', true);
        // this.walls.setAll('tint', 0x963103);

        // keyboard control
        this.cursors = game.input.keyboard.createCursorKeys();
        //var waterKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        // ---------------- maze ------------------- //
        var walls = game.add.group();
        walls.enableBody = true;
        // divide the screen into 20 * 30 grids
        var grid = game.world.width / 20; 
        // using array to store each wall position and size and then build them through a for loop
        // an element in this arrat consists of four required values and one optional value: 
        // namely, [wall.x, wall.y, wall.scale.x, wall.scally, wallName(if any)]
        var wallPositionSize = [
            //the external wall
            [0, 8, 1, 22, "westWall"],
            [19, 8, 1, 22, "eastWall"],
            [0, 29, 20, 1, "southWall"],
        ]


        for(var i = 0; i < wallPositionSize.length; i++){
            var wall = walls.create((wallPositionSize[i][0] * grid), (wallPositionSize[i][1] * grid), 'wall');
            wall.scale.setTo(wallPositionSize[i][2], wallPositionSize[i][3]);
            wall.body.immovable = true;
        }

        ////////////////////////////////////////////////////////////
    }


    update(){

        //Please always console teammate to put conflicts to minimum///////
        // Watson's code //
        //     game.physics.arcade.collide(this.firefighter, this.walls);
        //     game.physics.arcade.collide()

        ////////////////Kevin's section/////////////////////////////
        game.physics.arcade.overlap(this.firefighter, this.smallpig, function(fighter, pig){
            
            //this function will kill 1 pig, then reset in another position, return the number of pig 
            this.score_s_pig = pig_regeneration(pig, this.score_s_pig, this.show_score);

        }, null, this);

        game.physics.arcade.overlap(this.smallpig, this.s_fire, function(pig, fire){
           console.log("燒豬肉: " + this.smallpig.getIndex(pig) + "火: " + this.s_fire.getIndex(fire));
            pig_burn(pig);
            console.log( this.pigss_alive.children[this.smallpig.getIndex(pig)].width - 0.1);
                if(PIG_HEALTH - PIG_HIT_FIRE_HURT < 0){
                        this.smallpig.children[this.smallpig.getIndex(pig)].kill();
                        this.pigss_alive.children[this.smallpig.getIndex(pig)].kill();
                        this.pigss_BG.children[this.smallpig.getIndex(pig)].kill();
                        console.log("PIG DIED DUE TO FIRE");
                } else if(PIG_HEALTH >= 0){
                        PIG_HEALTH -= PIG_HIT_FIRE_HURT;
                        return this.pigss_alive.children[this.smallpig.getIndex(pig)].width = PIG_HEALTH;
                }

        }, null, this)

        game.physics.arcade.overlap(this.firefighter, this.s_fire, function(fighter, fire){
            //console.log("---------:(((((-------get hit!", this.s_fire.getIndex(fire));
            man_burn(fighter);
        }, null, this)

        game.physics.arcade.overlap(this.weapon, this.s_fire, function(){
            console.log("FIGHTING WATEEEEEEEEEEEEEEEEEEER!!!!!!!!");
            f_fighting(this.s_fire, false);
        }, null, this);


        //f_fighting(this.s_fire.children[3], false);


        this.smallpig.forEach(function(m){
            var i = this.smallpig.getIndex(m);

            if(m.x < this.pig_random_walk[i][0]){
                this.pig_random_walk[i][2] = false;
            }
            else if (m.x > this.pig_random_walk[i][1])
            {
                this.pig_random_walk[i][2] =true;
            }

            if (this.pig_random_walk[i][2]){
                m.anchor.setTo(0.5,0.5);
                m.scale.x = -1;
                m.x -= SMALL_PIG_SPEED;
            }
            else{
                m.anchor.setTo(0.5,0.5);
                m.scale.x = 1;
                m.x += SMALL_PIG_SPEED;
            }
        },this, true)
        ////////////////////////////////////////////////////////////



        // Watson's code
          // fireman moving around
        if(this.cursors.up.isDown){
          if (this.cursors.up.shiftKey){
            this.firefighter.y -= FIREMAN_RUN_SPEED;
          }
          this.firefighter.y -= FIREMAN_WALK_SPEED;
        }else if(this.cursors.right.isDown){
            // console.log("right: ",FIREMAN_WALK_SPEED );
            if(this.cursors.right.shiftKey){
            this.firefighter.x += FIREMAN_RUN_SPEED;

          }
            this.firefighter.x += FIREMAN_WALK_SPEED;
         // this.firefighter.body.moveRight(FIREMAN_WALK_SPEED);
        }else if (this.cursors.down.isDown){
          if (this.cursors.down.shiftKey){
            //this.firefighter.body.moveDown(FIREMAN_RUN_SPEED);
            this.firefighter.y += FIREMAN_RUN_SPEED;
          }
          this.firefighter.y += FIREMAN_RUN_SPEED;
          //this.firefighter.body.moveDown(FIREMAN_WALK_SPEED);
        }else if (this.cursors.left.isDown){
          if(this.cursors.left.shiftKey){
            this.firefighter.x -= FIREMAN_RUN_SPEED;
          }
          this.firefighter.x -= FIREMAN_WALK_SPEED;
        }
          if (this.waterButton.isDown)
          {
            if (this.cursors.down.isDown){
            this.weapon.fireAngle = Phaser.ANGLE_DOWN;
            this.weapon.fire();
          }
          else if (this.cursors.up.isDown){
            this.weapon.fireAngle = Phaser.ANGLE_UP;
            this.weapon.fire();
          }
          else if (this.cursors.left.isDown){
            this.weapon.fireAngle = Phaser.ANGLE_LEFT;
            this.weapon.fire();
          }
          else if (this.cursors.right.isDown){
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.fire();
          }
          else{
            this.weapon.fire();
          }
          }

          // firemqan extinguishing firemqan
        // if W is Down, particle is released and fire around fireman will be extinguished in 3 seconds
        //if (waterKey.isDown){

        //}

        //Ching's : update the health bar position of the pig



        for (var i = 0; i<SMALL_PIG_COUNT; i++){
                this.pigss_BG.children[i].x = this.smallpig.children[i].x - 40;
                this.pigss_BG.children[i].y = this.smallpig.children[i].y- 60;
                this.pigss_alive.children[i].x = this.smallpig.children[i].x -40;
                this.pigss_alive.children[i].y = this.smallpig.children[i].y -60;
        }




    ////////////////Additional classes go here/////////////////////////


    }
    render(){
        this.weapon.debug();
        

    }

     updateOxygen(){
        if(this.firefighter.y > 300){
                if(OXYGEN_STARTING_VOLUMN - OXYGEN_CONSUMPTION < 0){
                        this.myHealth.destroy();
                        console.log("GAME OVER");
                        game.time.events.stop();
                } else if(OXYGEN_STARTING_VOLUMN>= 0){
                        OXYGEN_STARTING_VOLUMN -= OXYGEN_CONSUMPTION;
                        return this.myHealth.width = OXYGEN_STARTING_VOLUMN;
                }
        } else if (this.firefighter.y<300 && this.myHealth.width >0){
                if(this.myHealth.width <500){
                        OXYGEN_STARTING_VOLUMN += 30;
                        return this.myHealth.width = OXYGEN_STARTING_VOLUMN;
                }
        }
     }




}



///////////////////////////Kevin's function///////////////////////////////////



function pig_burn(pig){
    pig.animations.play("burn", 10, true);
    game.add.tween(pig).from({tint : Math.random() * 0xffffff}, 1000, Phaser.Easing.Linear.None, true) ;
    game.add.tween(pig).to({y: pig.y - 50}, 500, Phaser.Easing.Circular.Out, true)
    game.add.tween(pig).to({y: pig.y + 50}, 1000, Phaser.Easing.Bounce.Out, true,500);
    //game.add.tween(pig).to({alpha: 0.5}, 1000, Phaser.Easing.Bounce.Out, true,2, true);

}

function f_fighting(fire, destroy_fire) {

    //adding of smoke emmitter
    if (!destroy_fire) {
        var s_emitter = game.add.emitter(fire.x + 100, fire.y + 200, 2000);
        s_emitter.makeParticles('smoke');
        s_emitter.setScale(0.01, 0.26, 0.01, 0.26, 800);
        s_emitter.gravity = -200;
        s_emitter.alpha = 0.4;
        s_emitter.setRotation(0, 10);


        game.add.tween(fire.scale).to({ y: 3, x: 1.5 }, 1000, "Linear", true);
        s_emitter.start(false, 0, 0);
    }
    else {

        s_emitter.destroy();
    }
}

function man_burn(man){
    game.add.tween(man.scale).to({x: 1.8, y: 1.8}, 500, Phaser.Easing.Linear.None, true,0,0,true);
    //game.add.tween(man).from({tint: 0xffffff}, 100, Phaser.Easing.Linear.None, true);
}

function pig_regeneration(pig, score, text){
    
    //use kill because the array actually won't change in length, only alive() switch to false
    pig.kill();
    score ++;
    console.log(score);
    
    text.setText("SMALL PIG COLLECTED: " + score);


    //regenerate the pig again.....
    
    //for animation start
    var t = game.rnd.integerInRange(3000, 10000);
    console.log(t);
    game.time.events.add(1000,function(){
    //console.log("come", this.smallpig.getIndex(pig))
    pig.reset(game.world.randomX, game.world.randomY);
    game.add.tween(pig).from({alpha:0},500,Phaser.Easing.Bounce.Out,true,t)}
    , this);   
    console.log(pig);
    
    return score;

}


///////////////////////////////////////////////////////////////////////////////
