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

        this.clearList()

        for(let i = 0; i < rooms.length; i++)
        {
            this.addRow(rooms[i], i)
        }
    }

    private clearList()
    {
        this.getAll().forEach((item) => {
            item.destroy()
        })
    }

    addRow(room: RoomAvailable<any>, i: number)
    {
  
        //const row = new Phaser.GameObjects.DOMElement(this.scene).createFromCache('lobbyRow')
        
        const row = this.scene.add.dom(0, 0).createFromCache('lobbyRow')
        let s = room.clients.toString() + " / " + room.maxClients.toString()
        
        row.getChildByID('roomID').textContent = room.roomId
        row.getChildByID('playerCount').textContent = s
        row.getChildByID('joinButton')
            .addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
                (event) => {
                    console.log('join ' + room.roomId)

                    this.joinGame(room.roomId)

                }
            )

        row.setY(i * row.displayHeight + 10)
        
        console.log('added ', room.roomId, s, ' to ', this)
        this.add(row)

    }
}
