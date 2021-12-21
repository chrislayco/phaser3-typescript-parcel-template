import { Client, RoomAvailable } from "colyseus.js";
import Bootstrap from "../scenes/Bootstrap";

const client = new Client("ws://localhost:2567");
const lobby = await client.joinOrCreate("lobby");

export default class LobbyServer{
    allRooms: RoomAvailable[] = [];


    // todo:
    // pass client in Bootstrap
    // display rooms in lobby room
    // 

    lobby.onMessage("rooms", (rooms) => {
    allRooms = rooms;
    });

    lobby.onMessage("+", ([roomId, room]) => {
    const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
    if (roomIndex !== -1) {
        allRooms[roomIndex] = room;

    } else {
        allRooms.push(room);
    }
    });

    lobby.onMessage("-", (roomId) => {
    allRooms = allRooms.filter((room) => room.roomId !== roomId);
    });

}