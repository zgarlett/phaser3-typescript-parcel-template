import { DirectionAnimationList } from "~/types";
import { BaseSprite } from "./BaseSprite";

export class MovingSprite extends BaseSprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string,life?: number, frameSize?: number, directionAnimationList?: DirectionAnimationList) {
        super(scene, x, y, texture, life, frameSize, directionAnimationList);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
    }


}

