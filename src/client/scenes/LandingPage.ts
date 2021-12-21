import Phaser, { Loader } from 'phaser'
import { ILandingPageSceneData, IPlayerData } from '../../types/scenes'

export default class LandingPage extends Phaser.Scene
{
    element = Phaser.GameObjects.DOMElement
    private onSubmit?: (data: { username: string }) => void

    

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



    create(data: ILandingPageSceneData)
    {
        console.log('landing page')

        this.onSubmit = data.onSubmit
        
        const {width, height} = this.scale

        const element = this.add.dom(width * 0.5, height * 0.5)
            .createFromCache('nameform')

            

        const button = element.getChildByName('loginButton')
        const input = element.getChildByName('username') as HTMLInputElement

        button.addEventListener(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, 
            (event) => {
                console.log('clicked')
                if(input.value !== '' && this.onSubmit)
                {
        
                    if(this.validateString(input.value))
                    {
                        // start lobby from bootstrap

                        this.onSubmit({ username: input.value })
                    }
                }

                
                
            })

        
    }

    private validateString(s: string)
    {
        
        let validRegEx = '/^[^\\\/&]*$/' 

        if(s.match(validRegEx)){
            return false
        }
        return true
    }
}