import { BaseSprite } from '../SpriteClasses'

interface Keys {
    left: any;
    right: any;
    up: any;
    down: any;
}

export default class InputManager{

    protected keys: Keys;
    protected scene: Phaser.Scene;
    protected sprite: BaseSprite;
    protected shiftKey: Phaser.Input.Keyboard.Key;
    private speed: number;
    constructor(scene: Phaser.Scene, sprite: BaseSprite) {
        this.scene = scene;
        this.sprite = sprite;
        const { LEFT, RIGHT, UP, DOWN, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
        }) as Keys;
        this.shiftKey = scene.input.keyboard.addKey(SHIFT);
        this.speed = 1;
    }

    public getKeysObject(): Keys {
        return this.keys;
    }

    public setupDirections() {
        const vel = 100;
        const keys = this.keys;

        if (keys.left.isDown) {
            this.sprite.setVelocityX(-vel * this.speed);
            this.sprite.setVelocityY(0);
            this.sprite.turnLeft();
        } else if (keys.right.isDown) {
            this.sprite.setVelocityX(vel * this.speed);
            this.sprite.setVelocityY(0);
            this.sprite.turnRight();
        } else if (keys.up.isDown) {
            this.sprite.setVelocityY(-vel * this.speed);
            this.sprite.setVelocityX(0);
            this.sprite.turnDown();
        } else if (keys.down.isDown) {
            this.sprite.setVelocityY(vel * this.speed);
            this.sprite.setVelocityX(0);
            this.sprite.turnUp(); 
        }  else {
            this.sprite.setVelocity(0);
        }

        if (this.shiftKey.isDown ) {
            this.speed = 1.5;
        } else {
            this.speed = 1;
        }
        
        if (keys.left.isDown) {
            this.sprite.anims.play(this.sprite.getDirectionAnimationList()?.left ?? 'left', true);
        }
        else if (keys.right.isDown) {
            this.sprite.anims.play(this.sprite.getDirectionAnimationList()?.right ?? 'right', true);
        }
        else if (keys.up.isDown) {
            this.sprite.anims.play(this.sprite.getDirectionAnimationList()?.up ?? 'up', true);
        }
        else if (keys.down.isDown) {
            this.sprite.anims.play(this.sprite.getDirectionAnimationList()?.down ?? 'down', true);
        }
        else {
            this.sprite.anims.stop();
        }
    }


    public setUpAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.sprite.getSpriteTexture(), { start: 15, end: 18}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.sprite.getSpriteTexture(), { start: 10, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(this.sprite.getSpriteTexture(), { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.sprite.getSpriteTexture(), { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        
    }
}