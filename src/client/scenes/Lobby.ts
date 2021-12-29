import Phaser from 'phaser'
import { Client, RoomAvailable } from 'colyseus.js'
import LobbyServer from '../services/LobbyServer'
import { updateLobby } from 'colyseus'

export default class Lobby extends Phaser.Scene
{
    lobbyServer!: LobbyServer
    createNewGame?: () => (void)
    text?: Phaser.GameObjects.Text

    domElement?: Phaser.GameObjects.DOMElement



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

    // todo: 
    // make an html for a row of a lobby
    // add buttons that join the game
    
    private updateLobbyList()
    {
        let lobbyList = this.domElement?.getChildByID('lobbyList') 
        let roomList = this.lobbyServer.roomList
        
        if(!lobbyList)
        {
            return
        }
        else if(roomList.length)
        {
            lobbyList.innerHTML = "<li>no rooms found</li>"
            return
        }

        

        let s = ''

        // use a template variable so that we can make a seprate html for row component
        // and pass in metadata to fill row
        for(let i = 0; i < roomList.length; i++){
            s += this.createListRow(roomList[i])
        }

        


        if(lobbyList)
        {
            lobbyList.innerHTML = s
        }
        else
        {
            console.warn('no lobby list element')
        }
  
    }

    private createListRow(room: RoomAvailable<any>)
    {
        if()
        

        let s = ''
        s += "<li> "
        s += room.roomId.toString()
        s += "   " + room.clients
        s += " / " + room.maxClients
        s += "<button id=\"" + room.roomId.toString() + "\" "
        s += "</li>\n"

        return s
    }
}