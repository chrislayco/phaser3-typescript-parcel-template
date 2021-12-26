import { Client, RoomAvailable } from "colyseus.js";
import Bootstrap from "../scenes/Bootstrap";



export default class LobbyServer
{
    allRooms: RoomAvailable[] = [];

    client: Client

    constructor(client: Client)
    {
        this.client = client
    }

    async join()
    {
        const lobby = await this.client.joinOrCreate("lobby");


        console.log('in the lobby server?????')

        lobby.onMessage("*",() => {
            console.log('got a message')
        })

        lobby.onMessage("rooms", (rooms) => {
            console.log('started')
            this.allRooms = rooms;
        });
        
        lobby.onMessage("+", ([roomId, room]) => {
            console.log('room created')
            const roomIndex = this.allRooms.findIndex((room) => room.roomId === roomId);
            if (roomIndex !== -1) {
                this.allRooms[roomIndex] = room;
        
            } else {
                this.allRooms.push(room);
            }
        });
    
        lobby.onMessage("-", (roomId) => {
            console.log('removed a room')
            this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
        });
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