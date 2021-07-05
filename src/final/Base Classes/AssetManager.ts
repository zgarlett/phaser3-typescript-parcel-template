export default class AssestManager{
    protected scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public buildSceneAssets(){
        this.scene.load.image('ground', 'assets/TestCopyTiles.png');
        this.scene.load.tilemapTiledJSON('map', 'assets/World-2-tilemap.json');
        this.scene.load.spritesheet('player', 'assets/sprites/Knight3.png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('effect', 'assets/sprites/Layer 1.png', { frameWidth: 32, frameHeight: 32 }); 
        this.scene.load.image('menu', 'assests/menu.png');
        this.scene.load.image('laser', 'assets/laserBlue02.png');
    }
}