import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import IMyState, { Cell } from '../../types/IMyState'



export default class NextTurnCommand extends Command<IMyState>
{
    execute()
    {
        const turn = this.room.state.activePlayer

        if(turn === 1)
        {
            this.room.state.activePlayer = 0
        }
        else
        {
            this.room.state.activePlayer = 1
        }
    }
}