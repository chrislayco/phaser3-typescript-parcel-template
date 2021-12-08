import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import IMyState, { Cell } from '../../types/IMyState'
import NextTurnCommand from './nextTurnCommand'

type Payload = {
    client: Client
    index: number
}

export default class PlayerSelectionCommand extends Command<IMyState, Payload>
{
    execute(data: Payload)
    {
        const {client, index } = data
        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
        const cellValue = clientIndex === 0 ? Cell.X : Cell.O
        this.room.state.board[index] = cellValue
        return [
            new NextTurnCommand()
        ]

        // this.room.state.board.forEach(cellValue => {
        //     console.log(cellValue)
        // })
    }
}