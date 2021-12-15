import Phaser from 'phaser'
import GameOver from '../GameOver'
import { Tweens } from 'phaser'

export default class TimerBar extends Phaser.GameObjects.Container
{
    timerTween: Phaser.Tweens.Tween
    bar: Phaser.GameObjects.Rectangle
    text: Phaser.GameObjects.Text


    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y)

        let barWidth = 900 - 100
        let barHeight = 10

        this.bar = this.scene.add.rectangle(0, 0, 1000, 1000, 0xff0000).setOrigin(0, 0)
        this.text = this.scene.add.text(0, 0, 'fweifwaefanwenf').setOrigin(0, 0)

        this.add(this.bar)
        this.add(this.text)

        this.setSize(1000, 1000)

        this.timerTween = this.scene.tweens.create({
            targets: this.bar,
            scaleX: 0,
            duration: 10000
            //onComplete: this.onComplete
        })
        
    }

    resetAndStartTimer()
    {

    }

    hideTimer()
    {

    }



}