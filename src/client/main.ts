import Phaser from 'phaser'
import 'regenerator-runtime/runtime'

import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import LandingPage from './scenes/LandingPage'


//    //https://blog.ourcade.co/posts/2020/dom-element-button-phaser-3-typescript-rxjs-jsx/

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	parent: "phaser",
	dom: {
		createContainer: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LandingPage, Bootstrap, Game, GameOver]
}



export default new Phaser.Game(config)
