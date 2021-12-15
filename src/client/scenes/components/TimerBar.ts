import Phaser from 'phaser'
import GameOver from '../GameOver'
import { Tweens } from 'phaser'

export default class TimerBar extends Phaser.GameObjects.Container
{
    private bar: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text
    private textValue = '10'

    private timer: Phaser.Time.TimerEvent

    private timerTween: Phaser.Tweens.Tween

    private onComplete: () => (void)

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        console.log('timer bar created')
        this.scene = scene
        
        this.bar = this.scene.add.rectangle(0, 0, Math.floor(this.scene.scale.width * 0.9), 15, 0xffffff)
        this.text = this.scene.add.text(0, -20, this.textValue).setOrigin(0.5)

        

        this.add(this.bar)
        this.add(this.text)

        this.createTweens()
        
    }

    private createTweens()
    {
        this.timerTween = this.scene.tweens.create({
            targets: this.bar,
            scaleX: 0,
            duration: 10000,
            onComplete: this.onComplete
        })
    }

    private updateTimerText = () => {
        this.textValue = (Number(this.textValue) - 0.1).toPrecision(2)
        
        //(this.textValue - 0.1).toPrecision(2)
        this.text.setText(this.textValue)
    }

    resetAndStartTimer()
    {
        console.log('starting timer')
        this.bar.visible = true
        this.timerTween.play()
        
        this.timer = this.scene.time.addEvent({
            delay: 100,
            repeat: 100 - 1,
            callback: this.updateTimerText,
            
        })
        
    }

    hideTimer()
    {
        if(this.timerTween.isPlaying()){
            this.timerTween.seek(0)  
            this.timerTween.stop()
        }

    }
}