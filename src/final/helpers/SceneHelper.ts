export class SceneHelper {

    public initializeAssets(scene: Phaser.Scene){
        scene.load.tilemapTiledJSON('map', 'assets/tile_properties.json');
        scene.load.image('tiles', 'assets/gridtiles.png');
        
    }
}