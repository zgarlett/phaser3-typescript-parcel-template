


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Games]
}

export default new Phaser.Game(config)
