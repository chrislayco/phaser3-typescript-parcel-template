import { Client, Room } from "colyseus.js"
import { Schema } from "@colyseus/schema"
import { EventEmitter } from "colyseus.js/lib/core/signal"
import Phaser from 'phaser'
import { IMyState } from "../../types/IMyState"
import { GameState } from "../../types/IMyState"
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

    get gameState()
    {
        if(!this.room)
        {
            return GameState.Waiting
            
        }

        return this.room?.state.gameState
    }

    constructor()
    {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
    }

 
    async join()
    {
        this.room = await this.client.joinOrCreate<IMyState>('my_room')
        
        this.room.onMessage(Message.PlayerIndex, (message: { playerIndex : number }) => {
            this._playerIndex = message.playerIndex
            //initialize text
            this.events.emit('game-start')
            
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
                        this.events.emit('next-turn', value)
                        break
                    case 'winnerPlayer':
                        this.events.emit('win-player', value)
                        break
                    case 'gameState':
                        this.events.emit('game-state-changed', value)
                }
            })
        }
    }

    leave()
    {
        this.room?.leave()
        this.events.removeAllListeners()
    }
    

    makeSelection(idx: number)
    {
        if(!this.room)
        {
            return
        }

        if(this.playerIndex !== this.room.state.activePlayer)
        {
            console.warn('not this player\'s turn FUCKER')

            //console.log(`player index: this._playerIndex`)
            return
        }

        this.room.send(Message.PlayerSelection, {index: idx, playerIndex: this.playerIndex})
    }

    onceStateChanged(cb: (state: IMyState) => void, context?: any)
    {
        this.events.once('once-state-changed', cb, context)
    }

    onGameStart(cb: () => void, context?: any)
    {
        this.events.on('game-start', cb, context)
    }

    onBoardChanged(cb: (location: number[]) => void, context?: any)
    {
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

    onGameStateChanged(cb: (state: GameState) => void, context?: any)
    {
        this.events.on('game-state-changed', cb, context)
    }
} 