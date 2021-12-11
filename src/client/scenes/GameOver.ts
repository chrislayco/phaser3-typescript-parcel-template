//import { text } from "express"
import Phaser from "phaser"
import { IGameOverSceneData, IGameSceneData } from "../../types/scenes"

export default class GameOver extends Phaser.Scene
{
    private onRestart?: (data: IGameOverSceneData) => void

    constructor(){
        super('game-over')
    }

    create(data: IGameOverSceneData)
    {
        const text = data.winner
            ? 'you won'
            : 'you lost'


        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.5, text, { fontSize: '48px' })
            .setOrigin(0.5) 

        this.add.text(width * 0.5, height * 0.5 + 100, 'press space to play again', { fontSize: '36px'})
            .setOrigin(0.5)
        
        this.input.keyboard.once('keyup-SPACE', () => {
            console.log('pressed!')
            if(data.onRestart)
            {
                data.onRestart()
            }
            else{
                console.warn('no restart callback')
            }

        })
    }
}