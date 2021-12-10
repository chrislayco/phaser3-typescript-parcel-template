import Phaser from "phaser"
import { IGameOverSceneData } from "~/types/scenes"
import Server from '../services/Server'

export default class Bootstrap extends Phaser.Scene
{
    private server!: Server
    constructor()
    {
        super('bootstrap')
    }

    init()
    {
        this.server = new Server()
    }

    create()
    {
        console.log('bootstrap scene')
        this.createNewGame()
    }

    private createNewGame()
    {
        console.log('creating a game')
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

        this.scene.launch('game-over', {
            ...data,
            onRestart: this.handleRestart
        })
    }

    

}