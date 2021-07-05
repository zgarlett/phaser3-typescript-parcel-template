import { Game } from 'phaser';
import { Direction } from '~/types';
import { BaseSprite } from './BaseSprite';

interface SpriteMetaData {
    position: { x: number; y: number };
    direction: Direction;
}

export class Magic extends Phaser.GameObjects.Sprite {
    /**Test Class */
    private isActive = false;
    private direction: Direction = 'up';
    private magicKey: Phaser.Input.Keyboard.Key;
    private speed = 5;
    private actualTime = 0;
    private resetTime = 0;
    private resetFlag = false;
    constructor(
        protected attachedSprite: BaseSprite,
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string | Phaser.Textures.Texture,
        frame?: string | number | undefined
    ) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        const { S } = Phaser.Input.Keyboard.KeyCodes;
        this.magicKey = scene.input.keyboard.addKey(S);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.HandleDirectins();
        if (this.magicKey.isDown && this.attachedSprite) {
            this.direction = this.attachedSprite.getDirection();
            this.isActive = true;
            this.resetTime = time;
            this.resetFlag = true;
            this.anims.play('ice', true);
        }
        this.CheckLifeTime(1200);
    }
    CheckLifeTime(elapseTime: number) {
        if (this.resetFlag) {
            const difference = this.resetTime - this.actualTime;
            console.log('CHECK LEVEL 2', difference);
            if (this.actualTime - this.resetTime >= elapseTime) {
                console.log('CHECK LEVEL 3');
                this.Deactivate();
                this.resetFlag = false;
            }
        }
    }

    HandleDirectins() {
        this.Activate();
        this.resetTime = this.actualTime;
        const { direction } = this.GetAttachedSpriteMetaData();
        console.log(`EFFECT DIRECTION: ${direction}`);
        if (this.isActive && this.direction === 'down') {
            console.log('down');
            this.y += this.speed;
        }

        if (this.isActive && this.direction === 'up') {
            console.log('up');
            this.y -= this.speed;
        }

        if (this.isActive && this.direction === 'right') {
            console.log('right');
            this.x += this.speed;
        }

        if (this.isActive && this.direction === 'left') {
            console.log('left');
            this.x -= this.speed;
        }
    }

    GetAttachedSpriteMetaData(): SpriteMetaData {
        return {
            position: { x: this.attachedSprite.x, y: this.attachedSprite.y },
            direction: this.attachedSprite.getDirection(),
        };
    }

    GetActivity(): boolean {
        return this.isActive;
    }

    TurnOff() {
        this.isActive = false;
    }

    TurnOn() {
        this.isActive = true;
    }

    Deactivate() {
        this.setVisible(false);
        this.setActive(false);
    }

    Activate() {
        this.setVisible(true);
        this.setActive(true);
        //this.anims.pause();
    }
}
