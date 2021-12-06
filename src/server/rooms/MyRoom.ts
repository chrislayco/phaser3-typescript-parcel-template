import { Room, Client } from "colyseus";
import { Dispatcher } from '@colyseus/command'
import { Message } from "../../types/messages"
import MyRoomState from "./schema/MyRoomState";
import PlayerSelectionCommand from "../commands/playerSelectionCommand";

export class MyRoom extends Room<MyRoomState> {

  
  private dispatcher = new Dispatcher(this)

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage(Message.PlayerSelection, (client, message) => {
      console.log(message)
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index
      })
    })

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");



  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}