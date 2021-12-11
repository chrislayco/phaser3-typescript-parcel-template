import Phaser from 'phaser'
import GameOver from '../GameOver'
import { Tweens } from 'phaser'

export default class TimerBar 
{
    private scene: Phaser.Scene
    private bar: Phaser.GameObjects.Rectangle
    private scaleX: number
    private x: number
    private y: number

    private timerTween: Phaser.Tweens.Tween

    private onComplete: () => (void)

    constructor(scene: Phaser.Scene, onComplete: () => (void), x: number, y: number)
    {
        this.scene = scene
        this.x = x
        this.y = y

        this.onComplete = onComplete
        
        this.createTimerBar()

        
    }

    private createTimerBar()
    {
        console.log('creating bar')

        //this.bar = new Phaser.GameObjects.Rectangle(this.scene, 10, 600, 700, 10, 0xffffff)

        let width = this.scene.scale.width - 100
        let x = this.x - width * 0.5

        this.bar = this.scene.add.rectangle(x, this.y, this.scene.scale.width - 100, 10, 0xffffff)
            .setOrigin(0)

        this.timerTween = this.scene.tweens.create({
            targets: this.bar,
            scaleX: 0,
            duration: 10000,
            onComplete: this.onComplete
        })

    }


    resetAndStartTimer()
    {
        //this.bar.scaleX = 
        console.log('starting timer')
        this.timerTween.play()
        
    }

    hideTimer()
    {
        console.log('stopping timer')
        this.timerTween.seek(1)
        this.timerTween.stop()
        //this.timerTween.seek(0)
    }
}