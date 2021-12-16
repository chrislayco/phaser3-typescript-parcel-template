import { Room, Client } from "colyseus";
import { Dispatcher } from '@colyseus/command'
import { Message } from "../../types/messages"
import MyRoomState from "./schema/MyRoomState";
import PlayerSelectionCommand from "../commands/playerSelectionCommand";
import { GameState } from "../../types/IMyState";

export class MyRoom extends Room<MyRoomState> {

  
  private dispatcher = new Dispatcher(this)

  private firstPlayer = -1

  onCreate (options: any) {
    this.maxClients = 2
    this.setState(new MyRoomState());

    this.onMessage(Message.PlayerSelection, (client, message: {index: number, playerIndex: number}) => {
      //console.log(message)

      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index,
        playerIndex: message.playerIndex
      })
    })

  }

  onJoin (client: Client, options: any) {
  
    console.log(client.sessionId, "joined!");
 
    //instead of assigning index on join, assign when 2 players are present, randomly

    if (this.clients.length == 2)
    {
      this.state.gameState = GameState.Playing

      const idx0 = Math.round(Math.random())
      const idx1 = idx0 === 1 ? 0 : 1

      this.clients[0].send(Message.PlayerIndex, { playerIndex: idx0})
      this.clients[1].send(Message.PlayerIndex, { playerIndex: idx1})

      this.state.activePlayer = 0
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}