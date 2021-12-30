import Phaser from 'phaser'


export default class TimerBar extends Phaser.GameObjects.Container
{
    private bar: Phaser.GameObjects.Rectangle
    private text: Phaser.GameObjects.Text
    private textValue = ''
    private timerDuration = 10000
    private timerDurationInSeconds = 10

    private timer?: Phaser.Time.TimerEvent

    private timerTween?: Phaser.Tweens.Tween

    private onComplete: () => (void)

    constructor(scene: Phaser.Scene, onComplete: () => (void), x: number, y: number, duration?: number)
    {
        super(scene, x, y)

        this.scene = scene
        this.onComplete = onComplete
        
        this.bar = this.scene.add.rectangle(0, 0, Math.floor(this.scene.scale.width * 0.9), 15, 0xffffff)
        this.text = this.scene.add.text(0, -20, this.textValue).setOrigin(0.5)

        if(duration)
        {
            this.timerDuration = duration
            this.timerDurationInSeconds = this.timerDuration / 100
        }

        this.add(this.bar)
        this.add(this.text)

        this.createTweens()
        
    }


    private createTweens()
    {
        this.timerTween = this.scene.tweens.create({
            targets: this.bar,
            scaleX: 0,
            duration: this.timerDuration,
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
        this.bar.visible = true
        this.timerTween?.play()
        
        this.textValue = this.timerDurationInSeconds.toString()

        this.scene.time.removeAllEvents()

        this.timer = this.scene.time.addEvent({
            delay: 100,
            repeat: (this.timerDuration / 100) - 1,
            callback: this.updateTimerText,
            
        })
        
    }

    hideTimer()
    {
        if(this.timerTween?.isPlaying()){
            this.timerTween.seek(0)  
            this.timerTween.stop()
        }

        //this.scene.time.removeEvent(this.timer)
        this.textValue = ''
        this.text.setText(this.textValue)

    }
}