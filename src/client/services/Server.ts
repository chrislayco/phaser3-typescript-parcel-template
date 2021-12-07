import { Client, Room } from "colyseus.js"
import { Schema } from "@colyseus/schema"
import { EventEmitter } from "colyseus.js/lib/core/signal"
import Phaser from 'phaser'
import IMyState from "~/types/IMyState"
import { Message } from "../../types/messages"
import MyRoomState from "~/server/rooms/schema/MyRoomState"

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

        this.room.state.onChange = changes => {
            changes.forEach(change => {
                console.log(change)

                const { field, value} = change
                
                switch(field)
                {
                    case 'board':
                        this.events.emit('board-changed')
                        break
                    
                }
            })
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
    }

    onBoardChanged(cb: (state: MyRoomState) => void, context?: any)
    {
        this.events.on('board-changed', cb, context)
    }
} 