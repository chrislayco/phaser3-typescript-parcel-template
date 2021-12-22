import { Client, RoomAvailable } from "colyseus.js";
import Bootstrap from "../scenes/Bootstrap";

const client = new Client("ws://localhost:2567");
const lobby = await client.joinOrCreate("lobby");

export default class LobbyServer
{
    allRooms: RoomAvailable[] = [];


    // todo:
    // pass client in Bootstrap
    // display rooms in lobby room
    // 

    constructor()
    {
        lobby.onMessage("rooms", (rooms) => {
            this.allRooms = rooms;
            });
        
            lobby.onMessage("+", ([roomId, room]) => {
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