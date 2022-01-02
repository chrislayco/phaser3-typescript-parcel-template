import Phaser from 'phaser'
import { RoomAvailable } from 'colyseus.js'
import LobbyServer from '~/client/services/LobbyServer'

export default class LobbyList extends Phaser.GameObjects.Container
{
    scene!: Phaser.Scene
    joinGame!: (id: string) => (void)

    constructor(scene: Phaser.Scene, joinGame: (id: string) => (void), x: number, y: number)
    {
        super(scene, x, y)
        this.scene = scene

        this.joinGame = joinGame

    }

    update(rooms: RoomAvailable<any>[])
    {
        if(rooms.length == 0)
        {
            console.log('no rooms')
            return
        }

        this.removeAll()

        for(let i = 0; i < rooms.length; i++)
        {
            this.addRow(rooms[i], i)
        }
    }

    addRow(room: RoomAvailable<any>, i: number)
    {
  
        //const row = new Phaser.GameObjects.DOMElement(this.scene).createFromCache('lobbyRow')
        
        const row = this.scene.add.dom(0, 0).createFromCache('lobbyRow')
        let s = room.clients.toString() + " / " + room.maxClients.toString()
        
        row.getChildByID('roomID').textContent = room.roomId.toString()
        row.getChildByID('playerCount').textContent = s
        row.getChildByID('joinButton')
            .addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
                (event) => {
                    console.log('join ' + room.roomId)

                    // todo:
                    // figure out why there is another lobby list in corner
                    // make create game open new game instead of auto join
                    // make play again go back to lobby instead of join game

                    this.joinGame(room.roomId)

                }
            )

        row.setY(i * row.displayHeight + 10)
        
        this.add(row)

    }
}
