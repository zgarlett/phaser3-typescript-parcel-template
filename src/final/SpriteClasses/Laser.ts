import { Scene } from "phaser";
import { Direction } from "~/types";

class Laser extends Phaser.Physics.Arcade.Sprite
{
    private playerX;
    private playerY;
	constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, 'laser');
	}

	fire(x: number, y: number, spriteDirection: Direction) {
		this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);

        this.playerX = x;
        this.playerY = y;

        if(spriteDirection === 'up'){
            this.setVelocityY(-300);
        } else if(spriteDirection === 'down') {
            this.setVelocityY(300);
        } else if (spriteDirection === 'right') {
            this.setVelocityX(300);
        } else if ( spriteDirection === 'left') {
            this.setVelocityX(-300);
        }
        
        console.log(spriteDirection);
	}

    preUpdate(){
        if(this.x < this.playerX - 400 || this.x > this.playerX + 400 || this.y < this.playerY - 300 || this.y > this.playerY + 300){
            this.setActive(false);
            this.setVisible(false);
            console.log('X: ', this.x, 'Y: ', this.y);
        }
    }
}

export class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene: Scene, direction: Direction) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 30,
			key: 'laser',
			active: false,
			visible: false,
			classType: Laser
		});
	}

	fireBullet(x: number, y: number, direction: Direction) {
		const laser = this.getFirstDead(false);

		if(laser) {
			laser.fire(x, y, direction);
		}
	}
}