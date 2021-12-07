import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import IMyState, { Cell } from '../../types/IMyState'

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
        //console.log(clientIndex)
        const cellValue = clientIndex === 0 ? Cell.X : Cell.O
        this.room.state.board[index] = cellValue
        //console.log(`index ${index} to ${cellValue}`)

        this.room.state.board.forEach(cellValue => {
            console.log(cellValue)
        })
    }
}