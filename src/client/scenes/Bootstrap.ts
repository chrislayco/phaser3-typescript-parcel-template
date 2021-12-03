import Phaser from 'phaser'

export default class Bootstrap extends Phaser.Scene
{
    
    constructor(){
        super('bootstrap')

    }

    create(){
        console.log('bootstrap scene')

        this.scene.launch('game')

    }
}
