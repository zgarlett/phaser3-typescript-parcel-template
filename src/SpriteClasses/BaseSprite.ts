import { Direction, DirectionAnimationList } from "~/types";
import InputManager from "~/Base Classes/InputManager";
import LifeSystem from "~/Base Classes/LifeSystem";
import MagicSpell from "~/Base Classes/Projectile";

export class BaseSprite extends Phaser.Physics.Arcade.Sprite {
    private direction: Direction;
    private directionAnimationList: DirectionAnimationList | undefined;

    private spriteTexture: string;

    private inputManager: InputManager;
    private lifeSystem: LifeSystem;
    /**
     * 
     * @param scene 
     * @param x spawn coordinate
     * @param y spawn coordinate
     * @param texture Name of the text 
     * @param life 
     * @param frameSize 
     * @param directionAnimationList 
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, life?: number, frameSize?: number, directionAnimationList?: DirectionAnimationList) {
        super(scene, x, y, texture);

        this.setTexture(texture, frameSize ?? 0);
        this.setPosition(x, y);

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.directionAnimationList = directionAnimationList;
        this.direction = 'up';

        this.spriteTexture = texture;

        this.inputManager = new InputManager(scene,this);
        this.lifeSystem = new LifeSystem(life ?? 10);
        this.inputManager.setUpAnimations();


    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.inputManager.setupDirections();
    }

    public turnUp(){
        this.direction = 'up'
    }

    public turnDown(){
        this.direction = 'down';
    }

    public turnLeft(){
        this.direction = 'left';
    }

    public turnRight(){
        this.direction = 'right';
    }

    public getDirection(): Direction{
        return this.direction;
    }

    public getDirectionAnimationList(): DirectionAnimationList | undefined{
        return this.directionAnimationList;
    }

    public setDirectionAnimationList(directionList: DirectionAnimationList){
        this.directionAnimationList = directionList;
    }

    public getSpriteTexture(): string{
        return this.spriteTexture;
    }
}

