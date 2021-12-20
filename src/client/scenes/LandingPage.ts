import Phaser, { Loader } from 'phaser'


export default class LandingPage extends Phaser.Scene
{
    element = Phaser.GameObjects.DOMElement
    loader: Phaser.Loader.LoaderPlugin

    constructor()
    {
        super('landing-page')
        //this.loader = new Phaser.Loader.LoaderPlugin(this)

    }


    preload()
    {
        console.log('preloading?')
        //this.load.setPath()
        //this.load.image('kirby')

        //this.load.setPath("/client/components")
        
        // this.load.setBaseURL('http://labs.phaser.io')
        // this.load.image('sky', 'assets/skies/space3.png')
        // https://www.html5gamedevs.com/topic/6606-image-not-displaying-in-phaser/
        
    }

    create()
    {
        console.log('landing page')
        
        this.add.image(200, 200, 'kirby')

        this.add.dom(400, 400, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
        this.add.dom(100, 300, 'div', 'background-color: red; width: 220px; height: 100px; font: 48px Arial', 'Phaser');



        //const element = this.add.dom(0, 0).createFromCache('nameform')
        //element.setPerspective(800)

        //this.load.start()

        //console.log(this.load.isReady())

        //this.add.text(400, 400, 'test')

        //element.setPerspective(800)
        
    }
}