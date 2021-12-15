import Phaser from 'phaser'
import GameOver from '../GameOver'
import { Tweens } from 'phaser'

export default class TimerBar extends Phaser.GameObjects.Container
{
    private scene: Phaser.Scene
    private container: Phaser.GameObjects.Container
    private bar: Phaser.GameObjects.Rectangle
    private barLength: number
    private rt: Phaser.GameObjects.RenderTexture

    private timerTween: Phaser.Tweens.Tween

    private onComplete: () => (void)

    constructor(scene: Phaser.Scene, onComplete: () => (void), x: number, y: number)
    {
        console.log('timer bar created')
        this.scene = scene
        
        this.container = new Phaser.GameObjects.Container(this.scene, 100, 100)

        this.onComplete = onComplete
        
        //might not need this
        this.barLength = this.scene.scale.width - 100
        
        this.bar = new Phaser.GameObjects.Rectangle(this.scene, 10, 10, 600, 600, 0xffffff)
            .setOrigin(0)

        this.timerTween = this.scene.tweens.create({
            targets: this.bar,
            scaleX: 0,
            duration: 10000,
            onComplete: this.onComplete
        })


        this.rt = this.scene.add.renderTexture(x, y)
        this.container.add(this.bar)

        
    }

    resetAndStartTimer()
    {
        console.log('starting timer')
        this.bar.visible = true
        this.timerTween.play()
        
    }

    hideTimer()
    {
        if(this.timerTween.isPlaying()){
            this.timerTween.seek(0)  
            this.timerTween.stop()
        }

    }
}