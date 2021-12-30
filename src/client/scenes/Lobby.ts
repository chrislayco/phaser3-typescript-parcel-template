import Phaser from 'phaser'
import { Client, RoomAvailable } from 'colyseus.js'
import LobbyServer from '../services/LobbyServer'
import { updateLobby } from 'colyseus'
import LobbyList from './components/LobbyList'

export default class Lobby extends Phaser.Scene
{
    lobbyServer!: LobbyServer
    createNewGame?: () => (void)
    text?: Phaser.GameObjects.Text

    domElement?: Phaser.GameObjects.DOMElement
    roomListContainer: LobbyList



    constructor()
    {
        super('lobby')
        
    }

    preload()
    {
        this.load.html('lobby', 'static/lobby.html')
        this.load.html('lobbyRow', 'static/lobbyrow.html')
    }

    async create(data: { username : string , lobbyServer: LobbyServer, createNewGame: () => (void) } )
    {
        this.lobbyServer = data.lobbyServer

        await this.lobbyServer.join()

        

        this.createNewGame = data.createNewGame

        const { width, height } = this.scale
        let text = 'welcome ' + data.username

        this.add.text(width * 0.5, height * 0.1, text).setOrigin(0.5)

        this.roomListContainer = new LobbyList(this, width * 0.5, height * 0.7)
        
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

    }

    
    private updateLobbyList()
    {
        let roomList = this.lobbyServer.roomList
        console.log(roomList.length)

        if(roomList.length == 0)
        {
            console.log('no rooms')
            return
        }


        let s = ''

        this.roomListContainer.removeAll()

        // use a template variable so that we can make a seprate html for row component
        // and pass in metadata to fill row
        for(let i = 0; i < roomList.length; i++){

            this.roomListContainer.addRow(roomList[i])
        }
  
    }

    private createListRow(room: RoomAvailable<any>)
    {
    
        const row = this.add.dom(0, 0).createFromCache('lobbyRow')

        row.getChildByID('roomID').textContent = room.roomId.toString()

        let s = room.clients.toString() + " / " + room.maxClients.toString()

        row.getChildByID('playerCount').textContent = s

        const button = row.getChildByID('joinButton')

        button.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                console.log('join ' + room.roomId.toString())

                // todo:
                // modify lobbyserver and servers to join this lobby on press
                // launch and destroy corresponding scenes

            }
        )
        
        return row
    }
}