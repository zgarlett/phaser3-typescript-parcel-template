
var this = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
import Phaser, { Weapon } from 'phaser'
import { SceneHelper } from '~/helpers/SceneHelper';


export default class HelloWorldScene extends Phaser.Scene
{
    private map: Phaser.Tilemaps.Tilemap | undefined;
    private marker: Phaser.GameObjects.Graphics | undefined;
    private propertiesText;
    private helper: SceneHelper | undefined;
    private sprite;
    private weapon;
    private cursors;
    private fireButton;

	constructor()
	{
		super('hello-world')
    }

 preload() {

    this.load.image('ship', 'assets/sprites/thrust_ship.png');
    this.load.spritesheet('bullet', 'assets/sprites/rgblaser.png', 4, 4);

}



 create() {

    //  Creates 30 bullets, using the 'bullet' graphic
    const weapon =  new Weapon(this.game, this.plugins);//this.add.  weapon(40, 'bullet');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
    weapon.setBulletFrames(0, 80, true);

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
    weapon.fireRate = 50;

    //  Wrap bullets around the world bounds to the opposite side
    // weapon.bulletWorldWrap = true;

    sprite = this.add.sprite(400, 300, 'ship');

    sprite.anchor.set(0.5);

    this.physics.arcade.enable(sprite);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

 update() {

    if (cursors.up.isDown)
    {
        this.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    this.world.wrap(sprite, 16);

}

 render() {

    weapon.debug();

}
