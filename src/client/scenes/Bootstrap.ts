import Phaser from "phaser"
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
        this.scene.launch('game', {
            server: this.server
        })
    }
}