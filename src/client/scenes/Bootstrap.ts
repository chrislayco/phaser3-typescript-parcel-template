import Phaser from "phaser"
import { IGameOverSceneData } from "types/scenes"
import Server from '../services/Server'
import { Client, Room } from "colyseus.js"
import LobbyServer from "../services/LobbyServer"

export default class Bootstrap extends Phaser.Scene
{
    private server!: Server
    private lobbyServer!: LobbyServer
    private client!: Client

    constructor()
    {
        super('bootstrap')
    }

    init()
    {
        
        this.client = new Client('ws://localhost:2567')
        this.server = new Server(this.client)
        this.lobbyServer = new LobbyServer(this.client)
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

    private createLobby(data: { username: string })
    {
        this.scene.stop('landing-page')
        this.scene.launch(
            'lobby',
            {
                ...data,
                lobbyServer: this.lobbyServer,
                createNewGame: this.createNewGame,
                joinGame: this.joinGame
            }
        )
    }

    private handleSubmit = (data: { username: string}) =>
    {
        this.scene.stop('landing-page')
        
        this.createLobby(data)
    }

    private createNewGame = () =>
    {   
        this.lobbyServer.leave()
        this.scene.stop('lobby')

        //this.scene.setVisible(false, 'lobby')

        // todo : close scene or make it invisible or something when game starts

        if(this.scene.isActive('game'))
        {
            console.log('there is another scene active!')
            this.scene.remove('game')
        }

        this.scene.launch('game', {
            server: this.server,
            onGameOver: this.handleGameOver
        })

        // for testing
        //this.scene.setVisible(false, 'game')
    }

    private joinGame = (id: string) =>
    {
        this.lobbyServer.leave()
        this.scene.stop('lobby')

        if(this.scene.isActive('game'))
        {
            console.log('there is another scene active!')
            this.scene.remove('game')
        }

        

        this.scene.launch('game', {
            server: this.server,
            id: id,
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