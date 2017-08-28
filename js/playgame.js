const FIREMAN_WALK_SPEED = '20';
const FIREMAN_RUN_SPEED = FIREMAN_WALK_SPEED * 1.5;
const SMALL_PIG_SPEED = '10';
const BIG_PIG_SPEED = SMALL_PIG_SPEED * 1.5;
const OXYGEN_STARTING_VOLUMN = '500'
const FIREMAN_CONSUME_OXYGEN = '20'; // decrease per 3 seconds
const SMALL_PIG_CONSUME_OXYGEN = '5';
const BIG_PIG_CONSUME_OXYGEN = SMALL_PIG_CONSUME_OXYGEN  * 2;
const SMALL_PIG_COUNT = 5;
const BIG_PIG_COUNT = 3;
const OXYGEN_CONSUMPTION = FIREMAN_CONSUME_OXYGEN + SMALL_PIG_CONSUME_OXYGEN * SMALL_PIG_COUNT + BIG_PIG_CONSUME_OXYGEN * BIG_PIG_COUNT;
//////////additional constants setting go here/////////////



class PlayGame{

    create(){
        this.firefighter = game.add.sprite(40, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = game.add.group();         //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
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

        ////////////////////////////////////////////////////////////




        /////////////////Jimmy's section////////////////////////////
        game.load.audio("bgmusic", ["assets/sounds/bgmusic.mp3"]);
        this.bgMusic = game.add.audio("bgmusic");
        this.bgMusic.loopFull(1);
        this.bgMusic.stop();
	      var explosionSound = game.add.audio("explosion");
	      explosionSound.play();

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

        console.log (this.pig_random_walk);

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
        // physics //
        // game.physics.startSystem(Phaser.Physics.ARCADE);
        // // Wall
        // this.WallGroup = game.add.group();
        // Wall.enableBody = true;
        // Wall.body.immovable = true;
        // wall.tint = "#7f6000";






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
                m.x -= SMALL_PIG_SPEED/20;
            }
            else{
                m.anchor.setTo(0.5,0.5);
                m.scale.x = 1;
                m.x += SMALL_PIG_SPEED/20;
            }
        },this, true)
        ////////////////////////////////////////////////////////////

    }




    ////////////////Additional classes go here/////////////////////////
    // Watson's code
    moveFireman(){

    }


}
