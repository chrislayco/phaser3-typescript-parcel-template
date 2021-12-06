import Phaser from "phaser"
import IMyState from "~/types/IMyState"
import type Server from '../services/Server'


export default class Game extends Phaser.Scene
{
    server?: Server
    constructor()
    {
        super('game')
    }

    async create(data: {server: Server})
    {
        console.log('game scene')

        const { server } = data

        this.server = server

        if(!this.server)
        {
            throw new Error('no server instance')
        }

        await server.join()

        server.onceStateChanged(this.createBoard, this)
    }

    private createBoard(state: IMyState)
    {

        let size = 128

        const { width, height } = this.scale

        let startX = (width * 0.5) - size
        let startY = (height * 0.5) - size
        let x = startX
        let y = startY
        
        let margin = 5

        state.board.forEach((cellState, idx) => {
            this.add.rectangle(x, y, size, size, 0xffffff)
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.server?.makeSelection(idx)
                })
            x += ( size + margin )

            if ( (idx + 1) % 3 == 0)
            {
                y += ( size + margin )
                x = startX
            }
        })
    }
}