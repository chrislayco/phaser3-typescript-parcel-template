import { Client, Room, RoomAvailable } from "colyseus.js";
import { EventEmitter } from "colyseus.js/lib/core/signal"
import Server from "./Server";


export default class LobbyServer
{
    events: Phaser.Events.EventEmitter
    lobby!: Room
    allRooms: RoomAvailable[] = [];

    client: Client





    constructor(client: Client)
    {
        this.client = client
        this.events = new Phaser.Events.EventEmitter()
    }

    async join()
    {
        this.lobby = await this.client.joinOrCreate("lobby");

        this.lobby.onMessage("rooms", (rooms) => {
            this.allRooms = rooms;

            this.events.emit('lobby-update')
        });
        
        this.lobby.onMessage("+", ([roomId, room]) => {

            this.events.emit('lobby-update')

            const roomIndex = this.allRooms.findIndex((room) => room.roomId === roomId);
            if (roomIndex !== -1) {
                this.allRooms[roomIndex] = room;
        
            } else {
                this.allRooms.push(room);
            }
        });
    
        this.lobby.onMessage("-", (roomId) => {
            console.log('removed a room')

            this.events.emit('lobby-update')

            this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
        });
    }

    get roomList()
    {
        return this.allRooms
    }

    leave()
    {
        this.lobby.leave()
        this.lobby.removeAllListeners()
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