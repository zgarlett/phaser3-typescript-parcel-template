import { CursorKeys, Scene } from "phaser";
import { Direction, DirectionAnimationList } from "~/types";

interface Keys {
    left: any;
    right: any;
    up: any;
    down: any;
}
export class MovingSprite extends Phaser.Physics.Arcade.Sprite {

    protected direction: Direction;
    private directionAnimationList: DirectionAnimationList | undefined;
    private keys: Keys;
    private spriteTexture: string;
    protected cursor;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frameSize?: number, directionAnimationList?: DirectionAnimationList) {
        super(scene, x, y, texture);
        this.setTexture(texture, frameSize ?? 24);
        this.setPosition(x, y);
        scene.physics.world.enable(this);
        scene.add.existing(this);

        const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
        }) as Keys;
        this.spriteTexture = texture;
        this.directionAnimationList = directionAnimationList;
        this.direction = 'up';
        this.setUpAnimations();
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.setupDirections();
    }

    setupDirections() {
        const vel = 100;
        const keys = this.keys;

        if (keys.left.isDown) {
            this.setVelocityX(-vel);
            this.direction = 'left';
        } else if (keys.right.isDown) {
            this.setVelocityX(vel);
            this.direction = 'right';
        } else if (keys.up.isDown) {
            this.setVelocityY(-vel);
            this.direction = 'down';
        } else if (keys.down.isDown) {
            this.setVelocityY(vel);
            this.direction = 'up';
        } else {
            this.setVelocity(0);
        }


        if (keys.left.isDown) {
            this.anims.play(this.directionAnimationList?.left ?? 'left', true);
        }
        else if (keys.right.isDown) {
            this.anims.play(this.directionAnimationList?.right ?? 'right', true);
        }
        else if (keys.up.isDown) {
            this.anims.play(this.directionAnimationList?.up ?? 'up', true);
        }
        else if (keys.down.isDown) {
            this.anims.play(this.directionAnimationList?.down ?? 'down', true);
        }
        else {
            this.anims.stop();
        }
    }


    setUpAnimations() {
        const row3 = 24;
        const row = 6;
        const multi = (row * 8) - 1;
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.spriteTexture, { start: row3 + 6, end: row3 + 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.spriteTexture, { start: row3 + 9, end: row3 + 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(this.spriteTexture, { start: row3 + 0, end: row3 + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.spriteTexture, { start: row3 + 3, end: row3 + 5 }),
            frameRate: 10,
            repeat: -1
        });

    }
}

