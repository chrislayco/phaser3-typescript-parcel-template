import { Client, RoomAvailable } from "colyseus.js";
import Bootstrap from "../scenes/Bootstrap";



export default class LobbyServer
{
    allRooms: RoomAvailable[] = [];

    client: Client

    // todo:
    // pass client in Bootstrap
    // display rooms in lobby room
    // 

    constructor(client: Client)
    {
        console.log('lobby server created')
        this.client = client
    }

    async join()
    {
        const lobby = await this.client.joinOrCreate("lobby");

        lobby.onMessage("rooms", (rooms) => {
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
            this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
            });
    }

    

}