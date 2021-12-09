//import { text } from "express"
import Phaser from "phaser"

export default class GameOver extends Phaser.Scene
{
    constructor(){
        super('game-over')
    }

    create(data: { winner: boolean })
    {
        const text = data.winner
            ? 'you won'
            : 'you lost'


        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.5, text, { fontSize: '48px' })
            .setOrigin(0.5) 

    }
}