import Phaser from "phaser"
import { IGameOverSceneData, IPlayerData } from "~/types/scenes"
import Server from '../services/Server'
import Game from './Game'

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

    preload()
    {
        
    }

    create()
    {
        //this.createNewGame()
        this.createLandingPage()

    }

    private createLandingPage()
    {
        this.scene.launch(
            'landing-page',
            {
                onSubmit: this.handleSubmit
            }
        )
    }

    private handleSubmit = (data: {IPlayerData}) =>
    {
        this.scene.stop('landing-page')
        this.scene.launch('lobby', {
            ...data
        })
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