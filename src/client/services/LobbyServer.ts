import { Client, RoomAvailable } from "colyseus.js";
import { EventEmitter } from "colyseus.js/lib/core/signal"
import Bootstrap from "../scenes/Bootstrap";



export default class LobbyServer
{
    events: Phaser.Events.EventEmitter
    allRooms: RoomAvailable[] = [];

    client: Client



    constructor(client: Client)
    {
        this.client = client
        this.events = new Phaser.Events.EventEmitter()
    }

    async join()
    {
        const lobby = await this.client.joinOrCreate("lobby");

        lobby.onMessage("rooms", (rooms) => {
            console.log('started')
            this.allRooms = rooms;

            this.events.emit('lobby-update')
        });
        
        lobby.onMessage("+", ([roomId, room]) => {
            console.log('room created')

            this.events.emit('lobby-update')

            const roomIndex = this.allRooms.findIndex((room) => room.roomId === roomId);
            if (roomIndex !== -1) {
                this.allRooms[roomIndex] = room;
        
            } else {
                this.allRooms.push(room);
            }
        });
    
        lobby.onMessage("-", (roomId) => {
            console.log('removed a room')

            this.events.emit('lobby-update')

            this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
        });
    }

    get roomList()
    {
        return this.allRooms
    }

    onLobbyUpdate(cb: () => void, context?: any)
    {
        this.events.on('lobby-update', cb, context)
    }

    printRooms()
    {
        if(this.allRooms.length === 0)
        {
            console.log('no rooms')
            return
        }

        for(let i = 0; i < this.allRooms.length; i++)
        {
            console.log(this.allRooms[i])
        }
        
    }

    

}