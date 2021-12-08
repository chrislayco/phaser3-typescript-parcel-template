import Phaser from "phaser"
import IMyState, { Cell } from "~/types/IMyState"
import type Server from '../services/Server'



export default class Game extends Phaser.Scene
{
    server?: Server
    private cells: { display: Phaser.GameObjects.Rectangle, value: Cell }[] = [] 

    private size: number

    constructor()
    {
        super('game')

        this.size = 128
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

        

        const { width, height } = this.scale

        let startX = (width * 0.5) - this.size
        let startY = (height * 0.5) - this.size
        let x = startX
        let y = startY
        
        let margin = 5

        state.board.forEach((cellState, idx) => {
            const cell = this.add.rectangle(x, y, this.size, this.size, 0xffffff)
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.server?.makeSelection(idx)
                })
            
            this.cells.push({
                display: cell,
                value: cellState
            })

            x += ( this.size + margin )

            if ( (idx + 1) % 3 == 0)
            {
                y += ( this.size + margin )
                x = startX
            }
        })
        this.server?.onBoardChanged(this.handleBoardChanged, this)

    }

    private handleBoardChanged(board: number[])
    {
        console.log('handle board changed')
        let starSize = this.size - 16
        for(let i = 0; i < board.length; ++i)
        {
            const cell = this.cells[i]
            if(cell.value !== board[i])
            {
                cell.value = board[i]
                this.add.star(cell.display.x, cell.display.y, 4, 12, starSize, 0xff0000)
            }
        }
    }
}