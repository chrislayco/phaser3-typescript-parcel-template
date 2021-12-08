import { Client, Room } from "colyseus.js"
import { Schema } from "@colyseus/schema"
import { EventEmitter } from "colyseus.js/lib/core/signal"
import Phaser from 'phaser'
import { IMyState } from "~/types/IMyState"
import { Message } from "../../types/messages"


export default class Server
{
    private client: Client
    private events: Phaser.Events.EventEmitter
    private room?: Room<IMyState & Schema>

    constructor()
    {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
        console.log(this.client)

    }


    async join()
    {
        this.room = await this.client.joinOrCreate<IMyState & Schema>('my_room')
        
        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })

        this.room.state.board.onChange = () => {
            this.events.emit('board-changed')
        }
    }

    makeSelection(idx: number)
    {
        if(!this.room)
        {
            return
        }

        this.room.send(Message.PlayerSelection, {index: idx})
    }

    onceStateChanged(cb: (state: IMyState) => void, context?: any)
    {
        this.events.once('once-state-changed', cb, context)
        console.log("once state changed event triggered")
    }

    onBoardChanged(cb: (board: number[]) => void, context?: any)
    {
        console.log("on board changed event triggered")
        this.events.on('board-changed', cb, context)
    }
} 