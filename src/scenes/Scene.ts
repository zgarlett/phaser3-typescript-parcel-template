import Phaser from 'phaser'

export class WorldScene extends Phaser.Scene
{
    private controls;

	constructor()
	{
        
		super('hello-world')
	}

	preload()
    {
        
        const isImage = this.load.image('ground', 'assets/TestCopyTiles.jpg');
        const isMap = this.load.tilemapTiledJSON('map', 'assets/odyworld.json')
        console.log(isImage);
        console.log(isMap);
    }

    create()
    {
    
        
    }

    update (time, delta) {
    }
}
