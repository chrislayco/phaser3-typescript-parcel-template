import { Room, Client } from "colyseus";
import { Dispatcher } from '@colyseus/command'
import { Message } from "../../types/messages"
import MyRoomState from "./schema/MyRoomState";
import PlayerSelectionCommand from "../commands/playerSelectionCommand";
import { GameState } from "../../types/IMyState";

export class MyRoom extends Room<MyRoomState> {

  
  private dispatcher = new Dispatcher(this)

  onCreate (options: any) {
    this.maxClients = 2
    this.setState(new MyRoomState());

    this.onMessage(Message.PlayerSelection, (client, message: {index: number}) => {
      //console.log(message)

      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index
      })
    })

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
    client.send(Message.PlayerIndex, { playerIndex: idx})

    if (this.clients.length >= 2)
    {
      this.state.gameState = GameState.Playing
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}