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

        //ching's code here
<<<<<<< HEAD

=======
        //kokokokoksoko
>>>>>>> 6e170ef7c2bc7519d3aa5b5a8d21e76404053651

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
<<<<<<< HEAD
<<<<<<< HEAD
        this.firefighter.animations.play('walk', 50, true);
=======
        this.firefighter.animations.play('walk', 50, true);
>>>>>>> 4b52244b915545d761b646e5c35981d0d7ca42f5
=======
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
>>>>>>> 5ab13f5fd0022b730323bad31bf78cf5079b5af3

        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // physics //
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Wall
        this.WallGroup = game.add.group();
        Wall.enableBody = true;
        Wall.body.immovable = true;
        wall.tint = #7f6000;






        ////////////////////////////////////////////////////////////
    }


    update(){

        //Please always console teammate to put conflicts to minimum///////

    }




    ////////////////Additional classes go here/////////////////////////
    // Watson's code
    moveFireman(){

    }


}
