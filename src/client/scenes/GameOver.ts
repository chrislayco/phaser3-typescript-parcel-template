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
        let text = ''

        switch(data.winner)
        {
            case -1:
                text = 'you lose'
                break
            case 0:
                text = 'tie'
                break
            case 1:
                text = 'you win'
                break
        }


        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.5, text, { fontSize: '48px' })
            .setOrigin(0.5) 

        this.add.text(width * 0.5, height * 0.5 + 100, 'press space to return to lobby', { fontSize: '36px'})
            .setOrigin(0.5)
        
        this.input.keyboard.once('keyup-SPACE', () => {
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