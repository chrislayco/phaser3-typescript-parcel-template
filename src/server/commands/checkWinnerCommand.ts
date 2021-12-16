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

enum Outcomes
{
    Win,
    Tie,
    None
}

export default class CheckWinnerCommand extends Command<IMyRoomState, Payload>
{

    

    getValueAt = (row: number, col: number) => {
        let idx = 3 * row + col
        return this.room.state.board[idx]
    }

    private calculateWinner()
    {

        for(let i = 0; i < wins.length; i++)
        {
            let win = wins[i]
            let val1 = this.getValueAt(win[0].row, win[0].col)
            let val2 = this.getValueAt(win[1].row, win[1].col)
            let val3 = this.getValueAt(win[2].row, win[2].col)


            if(val1 !== Cell.Empty && val1 == val2 && val1 == val3){
                return Outcomes.Win
            }
        }
        
        if(this.calculateTie())
        {
            return Outcomes.Tie
        }

        return Outcomes.None 
    }

    private calculateTie()
    {
        for(let i = 0; i < 9; i++)
        {
            if(this.room.state.board[i] === Cell.Empty)
            {
                return false
            }
        }
        return true
    }
    
    execute()
    {


        switch(this.calculateWinner())
        {
            case(Outcomes.Win):
                this.room.state.winnerPlayer = this.room.state.activePlayer
                console.log(`winner: ${this.room.state.winnerPlayer}`)
                break

            case(Outcomes.Tie):
                this.room.state.winnerPlayer = -2
                console.log('tied')

            case(Outcomes.None):
                return new NextTurnCommand()

        }

    }
}