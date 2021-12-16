import Phaser from 'phaser'

export default class LandingPage extends Phaser.Scene
{
    element = Phaser.GameObjects.DOMElement

    constructor()
    {
        super('landing-page')

    }


    preload()
    {
        this.load.html('nameform', '/components/nameform.html')
    }

    create()
    {
        console.log('landing page')
        const element = this.add.dom(400, 400).createFromCache('nameform')
        this.add.text(400, 400, 'test')

        //element.setPerspective(800)
        
    }
}