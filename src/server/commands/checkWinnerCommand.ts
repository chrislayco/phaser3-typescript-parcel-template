import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { Cell } from '../../types/IMyState'
import IMyRoomState from '../rooms/schema/MyRoomState'
import NextTurnCommand from './nextTurnCommand'

type Payload = {
    winnerPlayer: number
}

const wins = [
    [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
    [{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}],
    [{row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}],

    [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}],
    [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}],
    [{row: 0, col: 2}, {row: 1, col: 2}, {row: 2, col: 2}],

    [{row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}],
    [{row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0}]
]



export default class CheckWinnerCommand extends Command<IMyRoomState, Payload>
{
    getValueAt = (row: number, col: number) => {
        let idx = 3 * row + col
        return this.room.state.board[idx]
    }

    private calculateWinner(){

        for(let i = 0; i < wins.length; i++)
        {
            let win = wins[i]
            let val1 = this.getValueAt(win[0].row, win[0].col)
            let val2 = this.getValueAt(win[1].row, win[1].col)
            let val3 = this.getValueAt(win[2].row, win[2].col)


            if(val1 !== Cell.Empty && val1 == val2 && val1 == val3){
                return true
            }
        }
        return false
    }
    
    execute()
    {
        const win = this.calculateWinner()

        if(win)
        {
            this.room.state.winnerPlayer = this.room.state.activePlayer
            console.log(`winner: ${this.room.state.winnerPlayer}`)
        }
        else
        {
            return new NextTurnCommand()
        }
    }
}