import Phaser from 'phaser'
import 'regenerator-runtime/runtime'

import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Bootstrap, Game]
}



export default new Phaser.Game(config)
