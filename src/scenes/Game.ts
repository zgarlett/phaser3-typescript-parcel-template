import Phaser from 'phaser';
import { Direction } from '~/types';
import { MagicSpells, LaserGroup, Knight } from '../SpriteClasses';

export default class HelloWorldScene extends Phaser.Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private direction: Direction;
    private shootButton: Phaser.Input.Keyboard.Key | undefined;
    private bullets: LaserGroup | undefined;
    private knight: Knight | undefined;

    constructor() {
        super('hello-world')
        this.direction = 'up';
    }

    preload() {
        this.load.image('ground', 'assets/tiles/TileMap.png'); 
        this.load.tilemapTiledJSON('map', 'assets/map/WorldMap.json');
        this.load.spritesheet('player', 'assets/sprites/AlienBob.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('effect', 'assets/sprites/Effects.png', { frameWidth: 32, frameHeight: 32 }); 
    }

    create() {
        const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' });
        map.addTilesetImage('World', 'ground', 32, 32);

        //  Then create the layers

        map.createLayer('ground', 'World');
        let collideLayer = map.createLayer('features', 'World')
            .setCollisionByProperty({ collision: true })
            .setCollisionFromCollisionGroup(true);
        this.knight = new Knight(this, 300, 400, 'player', 24);
        this.physics.add.collider(this.knight, collideLayer);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.knight!);

        //this.cursors = this.input.keyboard.createCursorKeys();

        //this.shootButton = this.input.keyboard.addKey('s');
        //this.bullets = new LaserGroup(this, this.direction);

        //this.scene.add('Scene', Scene)
        /*
        var controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.2
        };
        */
        //this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    }

    update(time: number, delta: number) {
        //this.controls.update(delta);
        //this.updatePlayer();

    }

}