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
    private room?: Room<IMyState>
    private _playerIndex = -1

    get playerIndex(){
        return this._playerIndex
    }

    constructor()
    {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
        console.log(this.client)

    }

 
    async join()
    {
        this.room = await this.client.joinOrCreate<IMyState>('my_room')
        
        this.room.onMessage(Message.PlayerIndex, (message: { playerIndex : number }) => {
            console.log(`player index: ${message.playerIndex}`)
            this._playerIndex = message.playerIndex
        })

        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })

        this.room.state.board.onChange = (value, key) => {
            const location = [value, key]
            this.events.emit('board-changed', location)
        }

        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                const { field, value } = change
                switch (field)
                {
                    case 'activePlayer':
                        this.events.emit('next-turn')
                        break
                    case 'winnerPlayer':
                        this.events.emit('win-player')
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

        if(this.playerIndex !== this.room.state.activePlayer)
        {
            console.warn('not this player\'s turn')

            //console.log(`player index: this._playerIndex`)
            return
        }

        this.room.send(Message.PlayerSelection, {index: idx})
    }

    onceStateChanged(cb: (state: IMyState) => void, context?: any)
    {
        this.events.once('once-state-changed', cb, context)
    }

    onBoardChanged(cb: (location: number[]) => void, context?: any)
    {
        console.log("on board changed event triggered")
        this.events.on('board-changed', cb, context)
    }

    onNextTurn(cb: (activePlayer: number) => void, context?: any)
    {
        this.events.on('next-turn', cb, context)
    }

    onPlayerWin(cb: (winningPlayer: number) => void, context?: any)
    {
        this.events.on('win-player', cb, context)
    }
} 