const FIREMAN_WALK_SPEED = '';
const FIREMAN_RUN_SPEED = '';
const PIG_SPEED = '';
const OXYGEN_CONSUME_RATE = '';
//////////additional constants setting go here/////////////



class PlayGame{
    var interiorWall;

    create(){
        this.firefighter = game.add.sprite(40, 100, 'fighter');      //sprite: our player in the game
        this.smallpig = "";         //sprite: the small-size pig - have less energy to fire burnt, will consume small amount of oxygen when picked by fireman
        this.bigpig = "";           //sprite: the big-size pig - have more energy to fire burnt, will consume more amount of oxygen when picked by fireman
        this.s_fire = "";           //sprite: the random fire on the map
        this.b_fire = "";           //sprite: the big screen width fire on the bottom. Will going up on screen when time pass
        this.water = "";            //sprite: the water spread from firefighter
        this.oxygen = "";           //integer: level of oxygen consumed by firefighter
        this.score_s_pig = "";      //integer: number of small-size pig collected by firefighter
        this.score_b_pig = "";      //integer: number of big-size pig collected by firefighter
        //////////additional variables go here/////////////


        /////////////////Ching's section////////////////////////////

        //ching's code here
        //kokokokoksoko

        ////////////////////////////////////////////////////////////




        /////////////////Jimmy's section////////////////////////////

        //jimmy's code here

        ////////////////////////////////////////////////////////////


        /////////////////Kevin's section////////////////////////////

        //kevin's code here
        this.firefighter.scale.x = 3;
        this.firefighter.scale.y = 3;
        this.firefighter.animations.add('walk');
        this.firefighter.animations.play('walk', 50, true);        

        ////////////////////////////////////////////////////////////


        /////////////////Watson's section////////////////////////////
        // interiorWall
        interiorWall = game.add.group();
        interiorWall.enableBody = true;
        interiorWall.body.immovable = true;

        // externalWall
        externalWall = 
        // physics //
this.game.physics.enable(this.interiorWall, Phaser.Physics.ARCADE);



        ////////////////////////////////////////////////////////////
    }


    update(){

        //Please always console teammate to put conflicts to minimum///////

    }




    ////////////////Additional classes go here/////////////////////////


}
