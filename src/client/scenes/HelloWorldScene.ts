import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'

export default class HelloWorldScene extends Phaser.Scene
{
    private client: Colyseus.Client
	constructor()
	{
		super('hello-world')
	}

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:2567')
    }

	preload()
    {
        this.load.setBaseURL('http://labs.phaser.io')

        this.load.image('sky', 'assets/skies/space3.png')
        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
        this.load.image('red', 'assets/particles/red.png')
    }

    async create()
    {
        this.add.image(400, 300, 'sky')

        const particles = this.add.particles('red')

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        logo.setVelocity(100, 200)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)

        const room = await this.client.joinOrCreate('my_room')

        console.log(room.name)
    }
}
