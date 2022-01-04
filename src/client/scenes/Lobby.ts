import Phaser from 'phaser'
import { Client, RoomAvailable } from 'colyseus.js'
import LobbyServer from '../services/LobbyServer'
import { updateLobby } from 'colyseus'
import LobbyList from './components/LobbyList'

export default class Lobby extends Phaser.Scene
{
    lobbyServer!: LobbyServer
    createNewGame!: () => (void)
    joinGame!: (id: string) => (void)
    text?: Phaser.GameObjects.Text

    domElement?: Phaser.GameObjects.DOMElement
    lobbyList!: LobbyList



    constructor()
    {
        super('lobby')
        
    }

    preload()
    {
        this.load.html('lobby', 'static/lobby.html')
        this.load.html('lobbyRow', 'static/lobbyrow.html')
    }

    

    async create(data: { username : string , lobbyServer: LobbyServer, createNewGame: () => (void) , joinGame: (id: string) => (void)} )
    {
        this.lobbyServer = data.lobbyServer
        this.joinGame = data.joinGame

        await this.lobbyServer.join()

        

        this.createNewGame = data.createNewGame

        const { width, height } = this.scale
        let text = 'welcome ' + data.username

        this.add.text(width * 0.5, height * 0.1, text).setOrigin(0.5)

        this.lobbyList = new LobbyList(this, this.joinGame, width * 0.5, height * 0.7)
        this.add.existing(this.lobbyList)
        
        //https://docs.colyseus.io/colyseus/builtin-rooms/lobby/ 
        //client side

        this.lobbyServer?.onLobbyUpdate(this.updateLobbyList, this)

        this.createUI()
    }

    private createUI()
    {
        const { width, height } = this.scale

        this.text = this.add.text(width * 0.5, height * 0.7, '')

        this.domElement = this.add.dom(width * 0.5, height * 0.5)
            .createFromCache('lobby')

        const button = this.domElement.getChildByName('createGameButton')
        const printButton = this.domElement.getChildByName('printGamesButton')

        button.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                if(this.createNewGame)
                {
                    this.createNewGame()
                }
            })

        printButton.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                this.updateLobbyList()
            })

        // printButton.removeEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
        //     (event) => {
        //         this.updateLobbyList()
        //     })
    }

    
    private updateLobbyList()
    {
        let roomList = this.lobbyServer.roomList

        if(roomList.length == 0)
        {
            console.log('no rooms')
            return
        }

        this.lobbyList.update(roomList)
  
    }

}