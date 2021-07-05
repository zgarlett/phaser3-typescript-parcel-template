import Phaser from 'phaser'

import Multi from './scenes/Multi'
import World from './scenes/OdyWorld';
import Games from './scenes/Game';
import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1200,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	scene: [Games]
}

export default new Phaser.Game(config);


export function GameHandler() {
	const game = new Phaser.Game(config);
	game.scene.start('Games');
}

