import Phaser from 'phaser'
import { Client } from 'colyseus.js'
import LobbyServer from '../services/LobbyServer'
import { updateLobby } from 'colyseus'

export default class Lobby extends Phaser.Scene
{
    lobbyServer!: LobbyServer
    createNewGame?: () => (void)
    text?: Phaser.GameObjects.Text

    constructor()
    {
        super('lobby')
    }

    preload()
    {
        this.load.html('lobby', 'static/lobby.html')
    }

    async create(data: { username : string , lobbyServer: LobbyServer, createNewGame: () => (void) } )
    {
        this.lobbyServer = data.lobbyServer

        await this.lobbyServer.join()

        this.createNewGame = data.createNewGame

        const { width, height } = this.scale
        let text = 'welcome ' + data.username

        this.add.text(width * 0.5, height * 0.1, text).setOrigin(0.5)

        //https://docs.colyseus.io/colyseus/builtin-rooms/lobby/ 
        //client side

        this.createUI()
    }

    private createUI()
    {
        const { width, height } = this.scale

        this.text = this.add.text(width * 0.5, height * 0.7, '')

        const element = this.add.dom(width * 0.5, height * 0.5)
            .createFromCache('lobby')

        

        const button = element.getChildByName('createGameButton')
        const printButton = element.getChildByName('printGamesButton')

        button.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                if(this.createNewGame)
                {
                    this.createNewGame()
                }
            })

        printButton.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                this.lobbyServer.printRooms()
            })

    }

    private updateLobbyList(s: string)
    {
        this.text?.setText(s)
    }
}