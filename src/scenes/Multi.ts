import Phaser from 'phaser'


export default class HelloWorldScene extends Phaser.Scene
{
    private jellyFish01: Phaser.GameObjects.Sprite | undefined;
    private jellyFish02: Phaser.GameObjects.Sprite | undefined;
    private crab: Phaser.GameObjects.Sprite | undefined;
    private greenJellyfish: Phaser.GameObjects.Sprite | undefined;
    private octopus: Phaser.GameObjects.Sprite | undefined;
    private purpleFish: Phaser.GameObjects.Sprite | undefined;
    private seahorse: Phaser.GameObjects.Sprite | undefined;
    private squid: Phaser.GameObjects.Sprite | undefined;
    private stingray: Phaser.GameObjects.Sprite | undefined;
    private flyingfish: Phaser.GameObjects.Sprite | undefined;
    private y = 300;
    private direction = 4;

	constructor()
	{
		super('hello-world')
    }

	preload(){
        //  Here we load the Starling Texture Atlas and XML file
        this.load.multiatlas
        this.load.atlasXML('seacreatures', 'assets/sprites/seacreatures.png', 'assets/sprites/seacreatures.xml');
        //  Here is the exact same set of animations but as a JSON file instead
        // game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

        //  Just a few images to use in our underwater scene
        this.load.image('undersea', 'assets/pics/undersea.jpg');
        this.add.image(0, 0, 'undersea');

        this.load.image('coral', 'assets/pics/seabed.png');
    }

    create() {
        
        const bg = this.add.image(400, 300, 'undersea');
        bg.setInteractive();
        let num = 0;
        bg.on('pointerdown', () => {
            console.log('click', num++);
        }, );
        //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
        //  So we can use the handy generateFrameNames function to create this for us.
        this.anims.create({ key: 'swim', frames: this.anims.generateFrameNames('seacreatures', { prefix: 'blueJellyfish', end: 30, zeroPad: 4 }), repeat: -1 });
        this.jellyFish01 = this.add.sprite(400, this.y , 'seacreatures').play('swim');
      
        this.y += 100;

        this.anims.create({ key: 'swim1', frames: this.anims.generateFrameNames('seacreatures', { prefix: 'stingray', end: 30, zeroPad: 4 }), repeat: -1 });
        this.jellyFish02 = this.add.sprite(400, this.y , 'seacreatures').play('swim1');
        
        /*
        this.anims.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
        this.jellyfish.play('swim');
        //  Let's make some more sea creatures in the same way as the jellyfish
    
        this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
        this.crab = this.add.sprite(550, 480, 'seacreatures');
        this.crab.animations.add('swim', Phaser.Animation.generateFrameNames('crab1', 0, 25, '', 4), 30, true);
        this.crab.play('swim');
    
        this.greenJellyfish = this.add.sprite(330, 100, 'seacreatures');
        this.greenJellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
        this.greenJellyfish.play('swim');
    
        this.octopus = this.add.sprite(160, 400, 'seacreatures');
        this.octopus.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
        this.octopus.play('swim');
    
        this.purpleFish = this.add.sprite(800, 413, 'seacreatures');
        this.purpleFish.animations.add('swim', Phaser.Animation.generateFrameNames('purpleFish', 0, 20, '', 4), 30, true);
        this.purpleFish.play('swim');
    
        this.seahorse = this.add.sprite(491, 40, 'seacreatures');
        this.seahorse.animations.add('swim', Phaser.Animation.generateFrameNames('seahorse', 0, 5, '', 4), 30, true);
        this.seahorse.play('swim');
    
        this.squid = this.add.sprite(610, 215, 'seacreatures', 'squid0000');
    
        this.stingray = this.add.sprite(80, 190, 'seacreatures');
        this.stingray.anims.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
        this.stingray.play('swim');
    
        this.flyingfish = this.add.sprite(60, 40, 'seacreatures', 'flyingFish0000');
    
    
        this.add.image(0, 466, 'coral');
    
        // to: function ( properties, duration, ease, autoStart, delay, repeat, yoyo ) {
        
        this.add.tween(this.purpleFish).to({ x: -200 }, 7500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        this.add.tween(this.octopus).to({ y: 530 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.add.tween(this.greenJellyfish).to({ y: 250 }, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        this.add.tween(this.jellyfish).to({ y: 100 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        */
    }

        update (time: number, delta: number){
            if(this.jellyFish01){
                

                if (this.jellyFish01.x >= 600){
                    this.jellyFish01.x -= this.direction;
                } else {
                    this.jellyFish01.x += this.direction;
                }

                console.log("JELLY", this.jellyFish01.x);
            }
        }
}
