const FIREMAN_WALK_SPEED = 1;
const FIREMAN_RUN_SPEED = FIREMAN_WALK_SPEED * 1.5;
const SMALL_PIG_SPEED = 0.5;
const BIG_PIG_SPEED = SMALL_PIG_SPEED * 1.5;

const FIREMAN_CONSUME_OXYGEN = 20; // decrease per 3 seconds
const SMALL_PIG_CONSUME_OXYGEN = 5;
const BIG_PIG_CONSUME_OXYGEN = SMALL_PIG_CONSUME_OXYGEN  * 2;
const SMALL_PIG_COUNT = 5;
const BIG_PIG_COUNT = 3;
let PIG_HEALTH = 50;
let OXYGEN_STARTING_VOLUMN = 500;
const OXYGEN_CONSUMPTION = FIREMAN_CONSUME_OXYGEN + SMALL_PIG_CONSUME_OXYGEN * SMALL_PIG_COUNT + BIG_PIG_CONSUME_OXYGEN * BIG_PIG_COUNT;
//////////additional constants setting go here/////////////



class PlayGame{

    create(){
        this.firefighter = game.add.sprite(40, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = game.add.group();         //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
        this.bigpig = game.add.sprite(100, 100, 's_pigv');            //sprite: the big-size pig - have more energy to fire burnt, will consume more amount of oxygen when picked by fireman
        this.s_fire = game.add.sprite(40, 300, 'fire');           //sprite: the random fire on the map
        this.b_fire = "";           //sprite: the big screen width fire on the bottom. Will going up on screen when time pass
        this.water = "";            //sprite: the water spread from firefighter
        this.oxygen = "";           //integer: level of oxygen consumed by firefighter
        this.score_s_pig = "";      //integer: number of small-size pig collected by firefighter
        this.score_b_pig = "";      //integer: number of big-size pig collected by firefighter
        //////////additional variables go here/////////////


        /////////////////Ching's section////////////////////////////

       //Fireman Health Bar
        var healthBarBG = game.add.bitmapData(500,50); //create the red background of health bar
            healthBarBG.ctx.beginPath();
            healthBarBG.ctx.rect(0,0,500,50);
            healthBarBG.ctx.fillStyle = 'red';
            healthBarBG.ctx.fill();
        this.bglife = game.add.sprite(100,30, healthBarBG); // set the red health bar

        var healthBar = this.game.add.bitmapData(this.bglife.width, this.bglife.height); //create the green health bar
            healthBar.ctx.beginPath();
            healthBar.ctx.rect(0,0, OXYGEN_CONSUMPTION ,this.bglife.height);
            healthBar.ctx.fillStyle = "green";
            healthBar.ctx.fill();
        this.myHealth = game.add.sprite(100 ,30, healthBar); //set the green health bar

        game.time.events.loop(3000, this.updateOxygen , this); //loop every 3 second(3000ms) to decrease the oxygen-consumption (update in function updateOxygen)

        //Pig's Health Bar
        var pigHealthRed = game.add.bitmapData(100,40);
            pigHealthRed.ctx.beginPath();
            pigHealthRed.ctx.rect(0,0,100,40);
            pigHealthRed.ctx.fillStyle = 'red';
            pigHealthRed.ctx.fill();
        var pigHealthBG = game.add.sprite(this.smallpig.x, this.smallpig.y -20, pigHealthRed);

        var pigHealthGreen = this.game.add.bitmapData(pigHealthBG.width, pigHealthBG.height);
            healthBar.ctx.beginPath();
            healthBar.ctx.rect(0,0, PIG_HEALTH ,pigHealthBG.height);
            healthBar.ctx.fillStyle = "green";
            healthBar.ctx.fill();
        this.pigHealth = game.add.sprite(this.smallpig.x, this.smallpig.y -20, pigHealthGreen);

        game.time.events.loop(1000, this.updateHealthPig , this);


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

        ////////////////////////////////////////////////////////////


        /////////////////Kevin's section////////////////////////////

        //kevin's code here

        //-------------------group of small pigs------------------------//
        // currently each pig contains a 3 variable array [distance of x, distance of y,
        //direction in T/F], true is right, false is left
        this.pig_random_walk = {};

        for (var i = 0; i < SMALL_PIG_COUNT; i ++){
            //for group: use create instead of add.sprite
            this.smallpig.create(game.world.randomX, game.world.randomY, 's_pigs', 0);
            this.smallpig.children[i].scale.x = 2;
            this.smallpig.children[i].scale.Y = 2;
            this.pig_random_walk[i] = ([this.smallpig.children[i].x - game.rnd.integerInRange(0, 200),
                this.smallpig.children[i].x + game.rnd.integerInRange(0, 200), true]);

        }
        //animate ALL pigs
        this.smallpig.callAll('animations.add', 'animations', 'walk', [0,1,2,3,4,5,6,7] , 10, true);
        this.smallpig.callAll('animations.play', 'animations', 'walk');
        //--------------------------------------------------------------//


        //this.smallpig.add(300,300, 's_pigv', 0);

        //animate the firfighter
        this.firefighter.scale.x = 3;
        this.firefighter.scale.y = 3;
        this.firefighter.animations.add('walk');

        this.firefighter.animations.play('walk', 50, true);

        //animate one small pig
        // this.smallpig.scale.x = 1.5;
        // this.smallpig.scale.y = 1.5;
        // this.smallpig.animations.add('walk');
        // this.smallpig.animations.play('walk', 25, true);

        //animate the fire
        this.s_fire.scale.x = 1.5;
        this.s_fire.scale.y = 1.5;
        this.s_fire.animations.add('burn');
        this.s_fire.animations.play('burn', 50, true);


        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // ---------------- physics  ---------------- //
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // ---------------- Screen
        game.world.collideWorldBounds = true;
        // ---------------- Wall

        this.wall = game.add.group();
        this.wall.tint = "#7f6000";
        this.wall.enableBody = true;


        var bottomWall = this.wall.create(0, game.world.height - 30, "bottomWall");
        bottomWall.body.immovable = true;

        // keyboard control
        this.cursors = game.input.keyboard.createCursorKeys();
        var waterKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        // ---------------- maze ------------------- //
        



        ////////////////////////////////////////////////////////////
    }


    update(){

        //Please always console teammate to put conflicts to minimum///////

        ////////////////Kevin's section/////////////////////////////
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

          // firemqan extinguishing firemqan
        // if W is Down, particle is released and fire around fireman will be extinguished in 3 seconds
        //if (waterKey.isDown){

        //}

        //Ching's : update the health bar position of the pig
        


    ////////////////Additional classes go here/////////////////////////
    // Watson's code

    }

     updateOxygen(){
        if(this.firefighter.y > 300){
                if(OXYGEN_STARTING_VOLUMN - OXYGEN_CONSUMPTION >= 0){
                        OXYGEN_STARTING_VOLUMN -= OXYGEN_CONSUMPTION;
                        this.myHealth.width = OXYGEN_STARTING_VOLUMN;
                } else if (OXYGEN_STARTING_VOLUMN === 0){
                        game.time.events.stop();
                }
        } else if (this.firefighter.y<300 && this.myHealth.width >=0){
                if(this.myHealth.width <500){
                        OXYGEN_STARTING_VOLUMN += 1;
                        this.myHealth.width = HEALTH;
                }
        }
     }


    updateHealthPig(){
        if(PIG_HEALTH - SMALL_PIG_CONSUME_OXYGEN >= 0){
                PIG_HEALTH -= SMALL_PIG_CONSUME_OXYGEN;
                this.pigHealth.width = PIG_HEALTH;
                console.log(PIG_HEALTH);
        } else {
            
                game.time.events.stop();
                //this.smallpig.destroy();
        }
    };

}
