
import { BaseSprite } from "~/SpriteClasses";
import { Direction } from "~/types/AnimationTypes";

export default class MagicSpell extends  Phaser.Physics.Arcade.Sprite{
    protected beginTime: number = 0;
    protected actualTime: number = 0;
    protected timeCheckerFlag: boolean = false;
    protected magicKey: Phaser.Input.Keyboard.Key;
    protected sprite: BaseSprite;
    constructor(scene: Phaser.Scene, sprite: BaseSprite) {
        super(scene,-1,-1,'effect',8);
        this.sprite = sprite;
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setTexture('effect', 8);
        this.setVisible(false);

        const { CTRL } = Phaser.Input.Keyboard.KeyCodes;
        this.magicKey = scene.input.keyboard.addKey(CTRL);
    }

    create(){
        this.setUp();
    }

    preUpdate(time: number, delta: number){
        this.CheckLife();
    }

    public async cast(resetX: number, resetY: number, direction: Direction): Promise<void>{
        this.sudoLive();
        this.setPosition(resetX, resetY);
        this.timeCheckerFlag = true;
       
        const vel = 100;
        this.anims.play('cast', true);
        switch (direction){
            case 'up':
                this.setVelocity(vel,0);
            case 'down': 
                this.setVelocity(-vel,0);
            case 'left': 
                this.setVelocity(0,vel);
            case 'right': 
                this.setVelocity(0,-vel);
        }
        
    }

    public CheckLife() {
        while(this.active){
            if(this.beginTime - 3000 > this.actualTime){
                this.sudoKill();
            }
        }
    }

    public sudoKill(){
        this.setActive(false);
        this.setVisible(false);
    }

    public sudoLive(){
        this.setActive(true);
        this.setVisible(true);
    }

    public setUp() {
        this.scene.anims.create({
            key: 'cast',
            frames: this.scene.anims.generateFrameNumbers('effect', { start: 16, end: 23}),
            frameRate: 10,
            repeat: -1
        });

         
    }
}