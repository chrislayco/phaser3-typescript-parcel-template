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
        // this.load.image('kirby', 'static/assets/kirby.png')
        this.load.html('nameform', 'static/nameform.html')
    }



    async create()
    {
        console.log('landing page')
        
        // const kreb = this.add.image(500, 200, 'kirby')

        const {width, height} = this.scale

        const element = this.add.dom(width * 0.5, height * 0.5).createFromCache('nameform')

        this.add.dom(400, 400, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
        this.add.dom(100, 300, 'div', 'background-color: red; width: 220px; height: 100px; font: 48px Arial', 'Phaser');



        //c
        //element.setPerspective(800)

        //this.load.start()

        console.log(this.load.isReady())

        //this.add.text(400, 400, 'test')

        //element.setPerspective(800)
        
    }
}