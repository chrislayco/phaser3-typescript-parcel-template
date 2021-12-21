import Phaser from 'phaser'

export default class Lobby extends Phaser.Scene
{
    constructor()
    {
        super('lobby')
    }

    create(data: { username : string})
    {
        const { width, height } = this.scale
        let text = 'welcome ' + data.username

        this.add.text(width * 0.5, height * 0.1, text).setOrigin(0.5)

        //https://docs.colyseus.io/colyseus/builtin-rooms/lobby/ 
        //client side

        
    }
}