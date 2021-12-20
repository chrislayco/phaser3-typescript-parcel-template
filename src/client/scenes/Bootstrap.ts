import Phaser from "phaser"
import { IGameOverSceneData } from "~/types/scenes"
import Server from '../services/Server'
import Game from './Game'

export default class Bootstrap extends Phaser.Scene
{
    private server!: Server
    private gameScene: Phaser.Scene
    constructor()
    {
        super('bootstrap')
    }

    init()
    {
        this.server = new Server()
    }

    preload()
    {
        
    }

    create()
    {
        //this.createNewGame()
        this.scene.launch('landing-page')
    }

    private createNewGame()
    {
        if(this.scene.isActive('game'))
        {
            console.log('there is another scene active!')
            this.scene.remove('game')
        }

        this.scene.launch('game', {
            server: this.server,
            onGameOver: this.handleGameOver
        })
    }

    private handleRestart = () => {
        this.scene.stop('game-over')
        
        this.createNewGame()
    }

    private handleGameOver = (data: {IGameOverSceneData}) => {
        this.server.leave()
        this.scene.stop('game')
        //this.scene.remove('game')

        this.scene.launch('game-over', {
            ...data,
            onRestart: this.handleRestart
        })
    }

    

}