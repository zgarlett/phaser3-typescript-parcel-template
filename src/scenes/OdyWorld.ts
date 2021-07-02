import Phaser from 'phaser'


export default class WorldScene extends Phaser.Scene
{
    private jellyFish01: Phaser.GameObjects.Sprite | undefined;

	constructor()
	{
		super('hello-world')
    }

	preload(){
        //this.load.path = '';
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/tileset-collision-shapes.json');
        this.load.image('kenny_platformer_64x64', 'assets/tilemaps/tiles/kenny_platformer_64x64.png');
    }

    create() {
        let map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        let tileset = map.addTilesetImage('tiles', undefined, 32, 32, 1, 2);
        let layer = map.createLayer(0, tileset, 0, 0);
    }

        update (time: number, delta: number){
        }
}
