import { BaseSprite } from "~/SpriteClasses";
import { Direction } from "~/types";

interface SpriteMetaData {
  position: { x: number; y: number };
  direction: Direction;
}

export class Effects extends Phaser.Physics.Arcade.Sprite {
  private magicKey: Phaser.Input.Keyboard.Key;
  private attacheSprite: BaseSprite;
  private resetTime = 0;
  private resetFlag = false;
  constructor(
    attachedSprite: BaseSprite,
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    scene.physics.world.enable(this);
    scene.add.existing(this);

    const { S } = Phaser.Input.Keyboard.KeyCodes;
    this.magicKey = scene.input.keyboard.addKey(S);
    this.attacheSprite = attachedSprite;
    this.play("fire");
  }

  preUpdate(time: number, delta: number) {

    this.CheckLifeTime(time, 4000);

    //console.log(`Effect Time: ${time}\nEffect delta: ${delta}`);
  }

  HandleRespawn(){
      this.Activate();
    const { position, direction } = this.GetAttachedSpriteMetaData();
    this.setPosition(position.x, position.y);
    console.log(`EFFECT DIRECTION: ${direction}`);

    if (direction === "left") {
      this.setVelocity(-100, 0);
    }
    if (direction === "down") {
      this.setVelocity(0, 100);
    }
    if (direction === "right") {
      this.setVelocity(100, 0);
    }
    if (direction === "up") {
      this.setVelocity(0, -100);
  }
}

  GetAttachedSpriteMetaData(): SpriteMetaData {
    return {
      position: { x: this.attacheSprite.x, y: this.attacheSprite.y },
      direction: this.attacheSprite.getDirection(),
    };
  }

  CheckLifeTime(time: number, elapseTime: number) {
      console.log("CHECK LEVEL 1");
    if (this.resetFlag) {
        const difference = this.resetTime - time;
        console.log("CHECK LEVEL 2", difference);
        if(time - this.resetTime  >= elapseTime){
            console.log("CHECK LEVEL 3");
            this.Deactivate();
            this.resetFlag = false;
        }
    }
  }

  Deactivate() {
    this.setVisible(false);
    this.setActive(false);
  }

  Activate() {
    this.setVisible(true);
    this.setActive(true);
  }
}
