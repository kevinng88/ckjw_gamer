const FIREMAN_WALK_SPEED = '20';
const FIREMAN_RUN_SPEED = IREMAN_WALK_SPEED * 1.5;
const SMALL_PIG_SPEED = '10';
const BIG_PIG_SPEED = SMALL_PIG_SPEED * 1.5;
const OXYGEN_STARTING_VOLUMN = '500'
const FIREMAN_CONSUME_OXYGEN = '20'; // decrease per 3 seconds
const SMALL_PIG_CONSUME_OXYGEN = '5';
const BIG_PIG_CONSUME_OXYGEN = SMALL_PIG_CONSUME_OXYGEN  * 2;
const OXYGEN_CONSUMPTION = FIREMAN_CONSUME_OXYGEN + SMALL_PIG_CONSUME_OXYGEN * SMALL_PIG_COUNT + BIG_PIG_CONSUME_OXYGEN * BIG_PIG_COUNT;
//////////additional constants setting go here/////////////



class PlayGame{

    create(){
        this.firefighter = game.add.sprite(40, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = game.add.sprite(300, 150, 's_pigs');         //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
        this.bigpig = "";           //sprite: the big-size pig - have more energy to fire burnt, will consume more amount of oxygen when picked by fireman
        this.s_fire = game.add.sprite(40, 300, 'fire');           //sprite: the random fire on the map
        this.b_fire = "";           //sprite: the big screen width fire on the bottom. Will going up on screen when time pass
        this.water = "";            //sprite: the water spread from firefighter
        this.oxygen = "";           //integer: level of oxygen consumed by firefighter
        this.score_s_pig = "";      //integer: number of small-size pig collected by firefighter
        this.score_b_pig = "";      //integer: number of big-size pig collected by firefighter
        //////////additional variables go here/////////////


        /////////////////Ching's section////////////////////////////
        
       //Fireman Health Bar
        var healthBarBG = game.add.bitmapData(500,128); //create the red background of health bar
            healthBarBG.ctx.beginPath();
            healthBarBG.ctx.rect(0,0,500,128);
            healthBarBG.ctx.fillStyle = 'red';
            healthBarBG.ctx.fill();
        var bglife = game.add.sprite(100,100, healthBarBG); // set the red health bar

        var healthBar = this.game.add.bitmapData(bglife.width, bglife.height); //create the green health bar
            healthBar.ctx.beginPath();
            healthBar.ctx.rect(0,0, OXYGEN_CONSUMPTION ,bglife.height);
            healthBar.ctx.fillStyle = "green";
            healthBar.ctx.fill();
        this.myHealth = game.add.sprite(100 ,100, healthBar); //set the green health bar

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

        //animate the firfighter
        this.firefighter.scale.x = 3;
        this.firefighter.scale.y = 3;
        this.firefighter.animations.add('walk');

        this.firefighter.animations.play('walk', 50, true);

        

        //animate the small pig
        this.smallpig.scale.x = 1.5;
        this.smallpig.scale.y = 1.5;
        this.smallpig.animations.add('walk');
        this.smallpig.animations.play('walk', 25, true);

        //animate the fire
        this.s_fire.scale.x = 1.5;
        this.s_fire.scale.y = 1.5;
        this.s_fire.animations.add('burn');
        this.s_fire.animations.play('burn', 50, true);


        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // physics //
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Wall
        this.WallGroup = game.add.group();
        Wall.enableBody = true;
        Wall.body.immovable = true;
        wall.tint = "#7f6000";
        // keyboard control
        this.cursors = game.input.keyboard.createCursorKeys();
        var waterKey = game.input.keyboard.addKey(Phaser.Keyboard.W);





        ////////////////////////////////////////////////////////////
    }


    update(){

        //Please always console teammate to put conflicts to minimum///////
        // Watson's code
          // fireman moving around
        player.body.setZeroVelocity();

        if(cursors.up.isDown){
          if (cursors.up.shiftKey){
            this.firefighter.body.moveUp(FIREMAN_RUN_SPEED);
          }
          this.firefighter.body.moveUp(FIREMAN_WALK_SPEED);
        }else if(cursors.right.isDown){
          if(cursors.right.shiftKey){
            this.firefighter.body.moveRight(FIREMAN_RUN_SPEED);
          }
          this.firefighter.body.moveRight(FIREMAN_WALK_SPEED);
        }else if (cursors.down.isDown){
          if (cursors.down.shiftKey){
            this.firefighter.body.moveDown(FIREMAN_RUN_SPEED);
          }
          this.firefighter.body.moveDown(FIREMAN_WALK_SPEED);
        }else if (cursors.left.isDown){
          if(cursors.left.isDown){
            this.firefighter.left.shiftKey(FIREMAN_RUN_SPEED);
          }
          this.firefighter.body.moveLeft(FIREMAN_WALK_SPEED);
        }

          // firemqan extinguishing firemqan
        // if W is Down, particle is released and fire around fireman will be extinguished in 3 seconds
        if (waterKey.isDown){

        }


    ////////////////Additional classes go here/////////////////////////
    // Watson's code

    }    

     updateOxygen(){
        if(OXYGEN_STARTING_VOLUMN - OXYGEN_CONSUMPTION >= 0){
                OXYGEN_STARTING_VOLUMN -= OXYGEN_CONSUMPTION;
                this.myHealth.width = OXYGEN_STARTING_VOLUMN;
        } else {
                game.time.events.stop();        
        }
    };

    updateHealthPig(){
        if(PIG_HEALTH - SMALL_PIG_CONSUME_OXYGEN >= 0){
                PIG_HEALTH -= SMALL_PIG_CONSUME_OXYGEN;
                this.pigHealth.width = PIG_HEALTH;
        } else {
                game.time.events.stop();
                this.smallpig.destroy();
        }
    };

}
