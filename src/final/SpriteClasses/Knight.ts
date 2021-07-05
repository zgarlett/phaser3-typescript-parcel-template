import {  MovingSprite } from "./MovingSprite";

export class Knight extends MovingSprite {
    /**
     * 
     * @param scene 
     * @param x 
     * @param y 
     * @param texture 
     * @param frameNumber 
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frameNumber?: number) {
        super(scene, x, y, texture, frameNumber);
    }

    preUpdate(time: number, delta: number) {
        return super.preUpdate(time, delta);
    }


}