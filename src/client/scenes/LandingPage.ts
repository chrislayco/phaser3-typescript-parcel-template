import Phaser, { Loader } from 'phaser'

export default class LandingPage extends Phaser.Scene
{
    element = Phaser.GameObjects.DOMElement

    constructor()
    {
        super('landing-page')

    }


    preload()
    {
        console.log('preloading?')
        this.load.html('nameform', '/client/scenes/components/nameform.html')
    }

    create()
    {
        console.log('landing page')



        this.add.dom(400, 400, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
        this.add.dom(100, 300, 'div', 'background-color: red; width: 220px; height: 100px; font: 48px Arial', 'Phaser');

        const element = this.add.dom(0, 0).createFromCache('nameform')
        //element.setPerspective(800)


        //this.add.text(400, 400, 'test')

        //element.setPerspective(800)
        
    }
}