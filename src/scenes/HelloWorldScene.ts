import Phaser from 'phaser'
import { SceneHelper } from '~/helpers/SceneHelper';


export default class HelloWorldScene extends Phaser.Scene
{
    private map: Phaser.Tilemaps.Tilemap | undefined;
    private marker: Phaser.GameObjects.Graphics | undefined;
    private propertiesText;
    private helper: SceneHelper | undefined;

	constructor()
	{
		super('hello-world')
    }

	preload()
    {
        
        this.helper = new SceneHelper();
        this.helper.initializeAssets(this);
        
    }

    create()
    {
        this.map = this.make.tilemap({ key: 'map' });
        let tileset = this.map.addTilesetImage('tiles');
        let layer = this.map.createLayer('Tile Layer 1', tileset, 0, 0);

        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
        
        let help = this.add.text(16, 500, 'Click on a tile to view its properties.', {
            font: '20px Arial',
        });
        help.setScrollFactor(0);

        this.propertiesText = this.add.text(16, 540, 'Properties: ', {
            fontSize: '18px',
        });
    }

    update (time: number, delta: number)
{
    let worldPoint: Phaser.Math.Vector2 = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2 || {};

    // Rounds down to nearest tile
    
    let pointerTileX = this.map!.worldToTileX(worldPoint.x);
    let pointerTileY = this.map!.worldToTileY(worldPoint.y);

    // Snap to tile coordinates, but in world space
    this.marker!.x = this.map!.tileToWorldX(pointerTileX);
    this.marker!.y = this.map!.tileToWorldY(pointerTileY);

    if (this.input.manager.activePointer.isDown)
    {
        let tile = this.map!.getTileAt(pointerTileX, pointerTileY);

        if (tile)
        {
            // Note: JSON.stringify will convert the object tile properties to a string
            this.propertiesText.setText('Properties: ' + JSON.stringify(tile.properties));
            tile.properties.viewed = true;
        }
    }
}
}
