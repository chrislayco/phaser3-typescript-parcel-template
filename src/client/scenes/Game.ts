import Phaser from "phaser"
import { IGameOverSceneData, IGameSceneData } from "~/types/scenes"
import IMyState, { Cell, GameState } from "../../types/IMyState"
import type Server from '../services/Server'



export default class Game extends Phaser.Scene
{
    private server?: Server
    private onGameOver?: (data: IGameOverSceneData) => void
    private cells: { display: Phaser.GameObjects.Rectangle, value: Cell }[] = [] 

    private size: number
    private gameStateText: Phaser.GameObjects.Text

    constructor()
    {
        super('game')

        this.size = 128
    }

    async create(data: IGameSceneData)
    {
        console.log('game scene')

        const { server, onGameOver } = data

        this.server = server
        this.onGameOver = onGameOver

        const width = this.scale.width
        this.gameStateText = this.add.text(width * 0.5, 50, 'waiting for opponent...')
            .setOrigin(0.5)

        if(!this.server)
        {
            throw new Error('no server instance')
        }

        await server.join() //WHEN THIS IS DONE, THE PLAYERINDEX IS ASSIGNED

        server.onceStateChanged(this.createBoard, this)
    }

    private createBoard(state: IMyState)
    {
        console.log('creating board')

        const { width, height } = this.scale

        let startX = (width * 0.5) - this.size
        let startY = (height * 0.5) - this.size
        let x = startX
        let y = startY

        let iconSize = this.size * 0.5 - 16
        
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

            switch(cellState){
                case Cell.X:
                    this.add.star(cell.x, cell.y, 4, 12, iconSize, 0xff0000)
                        .setAngle(45)
                    break
    
                case Cell.O:
                    this.add.circle(cell.x, cell.y, iconSize - 8, 0x2EAFDB)
                    break
            }

            x += ( this.size + margin )

            if ( (idx + 1) % 3 == 0)
            {
                y += ( this.size + margin )
                x = startX
            }
        })

        if(this.server?.gameState === GameState.Waiting)
        {
            const width = this.scale.width
            this.gameStateText.setText('waiting for players')
        }


        
        
        this.server?.onBoardChanged(this.handleBoardChanged, this)
        this.server?.onNextTurn(this.handleNextTurn, this)
        this.server?.onPlayerWin(this.handlePlayerWin, this)
        this.server?.onGameStateChanged(this.handleGameStateChanged, this)

        
    }

    private initializeTurnText()
    {
        console.log(`playerindex in init: ${this.server?.playerIndex}`)
        if(this.server?.playerIndex === 0)
        {
            this.gameStateText.setText('your turn')
        }
        else
        {
            this.gameStateText.setText('opponent\'s turn')
        }
    }

    private handleBoardChanged(location: number[])
    {
        let iconSize = this.size * 0.5 - 16

        const cell = this.cells[location[1]]

        if(cell.value === location[0])
        {
            return
        }

        cell.value = location[0]

        switch(cell.value){
            case Cell.X:
                this.add.star(cell.display.x, cell.display.y, 4, 12, iconSize, 0xff0000)
                    .setAngle(45)
                break

            case Cell.O:
                this.add.circle(cell.display.x, cell.display.y, iconSize - 8, 0x2EAFDB)
                break
        }
        

    }

    private handleNextTurn(playerIndex: Object)
    {
        //console.log('NEXT TURN!')
        //console.log(`turn: ${playerIndex}`)

        

        if(this.server?.playerIndex === playerIndex)
        {
            this.gameStateText.setText('your turn')
        }
        else
        {
            this.gameStateText.setText('opponent\'s turn')
        }
        
    }

    private handlePlayerWin(playerIndex: number)
    {
        if(!this.onGameOver)
        {
            return
        }

        this.onGameOver({
            winner: this.server?.playerIndex == playerIndex
        })
       
    }

    private handleGameStateChanged(state: GameState)
    {
        if(this.gameStateText && state === GameState.Waiting)
        {
            this.gameStateText.setText('waiting for players')
        }
        if(state === GameState.Playing){
            console.log('the game is now playing')
        }
        else if(state === GameState.Finished){
            this.gameStateText.destroy()
            this.gameStateText = null
        }
    }

    
}