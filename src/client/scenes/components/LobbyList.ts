import Phaser from 'phaser'
import { RoomAvailable } from 'colyseus.js'

export default class LobbyList extends Phaser.GameObjects.Container
{
    scene!: Phaser.Scene
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)
        this.scene = scene

        console.log('added at ', x , y)
        
    }

    addRow(room: RoomAvailable<any>)
    {


        console.log('adding row')

        
        //const row = new Phaser.GameObjects.DOMElement(this.scene).createFromCache('lobbyRow')
        
        const row = this.scene.add.dom(0, 0).createFromCache('lobbyRow')
        let s = room.clients.toString() + " / " + room.maxClients.toString()
        
        row.getChildByID('roomID').textContent = room.roomId.toString()
        row.getChildByID('playerCount').textContent = s
        row.getChildByID('joinButton')
            .addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
                (event) => {
                    console.log('join ' + room.roomId.toString())

                    // todo:
                    // modify lobbyserver and servers to join this lobby on press
                    // launch and destroy corresponding scenes

                }
            )
        
        this.add(row)

    }
}
