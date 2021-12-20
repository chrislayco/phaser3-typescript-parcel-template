import Phaser, { Loader } from 'phaser'

export default class LandingPage extends Phaser.Scene
{
    element = Phaser.GameObjects.DOMElement

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



    create()
    {
        console.log('landing page')

        console.log("why?")
        const {width, height} = this.scale

        const element = this.add.dom(width * 0.5, height * 0.5)
            .createFromCache('nameform')
            // .setInteractive()
            // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            //     (event) => {
            //         console.log(typeof event)
            //     }
            // )
            
        element.on('click', (event) => {
            console.log(event)
            console.log(event.target.name)
        })

        const button = element.getChildByName('loginButton')
        const input = element.getChildByName('username')

        button.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                console.log(event)

                
                console.log(input.value)
            })

        console.log(button)


        // button?.addEventListener('click', (event) => {
        //     console.log('clicked!')
        // })
        
    }
}