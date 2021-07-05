import { Direction, Position } from "~/types";

export class Magic extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined ){
        super(scene,x,y,'effect');
    }

    public shoot(spritePosition: Position, spriteDirection: Direction){
        this.body.reset(spritePosition.x,spritePosition.y);
        this.setActive(true);
        this.setVisible(true);

            if(spriteDirection === 'up'){
                console.log("MADE UP");
                this.setVelocityY(-300);
            } else if(spriteDirection === 'down') {
                console.log("MADE DOWN");
                this.setVelocityY(300);
            } else if (spriteDirection === 'right') {
                console.log("MADE RIGHT");
                this.setVelocityX(300);
            } else if ( spriteDirection === 'left') {
                console.log("MADE LEFT");
                this.setVelocityX(-300);
                this.anims.play('right')
            }
            //this.setVelocity(xVel,yVel);
        
        console.log(spriteDirection);
    
}

    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta)
        
       console.log('TIME', time, 'DELTA', delta);
        
    }
}

export class MagicSpells extends Phaser.Physics.Arcade.Group{
    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig){
        super(world,scene,children,config)
        Phaser
        this.createMultiple({
            frameQuantity: -1,
            key: 'effect',
            active: false,
            visible: false,
            classType: Magic,
            
            
        });

    }

    throwMagic(spritePosition: Position, spriteDirection: Direction){
        
         let magic = this.getFirstDead(true);
         if(magic){
             magic.shoot(spritePosition, spriteDirection);
         }
    }


}