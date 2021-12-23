import Phaser from 'phaser'
import { Client } from 'colyseus.js'
import LobbyServer from '../services/LobbyServer'

export default class Lobby extends Phaser.Scene
{
    lobbyServer!: LobbyServer
    constructor()
    {
        super('lobby')
    }

    async create(data: { username : string , client: Client } )
    {
        this.lobbyServer = new LobbyServer(data.client)

        await this.lobbyServer.join()

        const { width, height } = this.scale
        let text = 'welcome ' + data.username

        this.add.text(width * 0.5, height * 0.1, text).setOrigin(0.5)

        //https://docs.colyseus.io/colyseus/builtin-rooms/lobby/ 
        //client side


    }
}