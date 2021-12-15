import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import IMyState, { Cell } from '../../types/IMyState'
import CheckWinnerCommand from './checkWinnerCommand'
import NextTurnCommand from './nextTurnCommand'

type Payload = {
    client: Client
    index: number
    playerIndex: number
}

export default class PlayerSelectionCommand extends Command<IMyState, Payload>
{
    execute(data: Payload)
    {
        const {client, index, playerIndex } = data

        const cellValue = playerIndex === 0 ? Cell.X : Cell.O
        
        if(this.room.state.board[index] === Cell.Empty)
        {
            this.room.state.board[index] = cellValue
            return [
                new CheckWinnerCommand()
            ]
        }
        return
    
        //this.printBoard()

    }

    private printBoard()
    {
        console.log('---------')
        console.log('%d %d %d', this.room.state.board[0], this.room.state.board[1], this.room.state.board[2])
        console.log('%d %d %d', this.room.state.board[3], this.room.state.board[4], this.room.state.board[5])
        console.log('%d %d %d', this.room.state.board[6], this.room.state.board[7], this.room.state.board[8])
    }
}