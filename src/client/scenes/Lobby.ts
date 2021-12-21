import Phaser from 'phaser'
import { IPlayerData } from '~/types/scenes'

export default class Lobby extends Phaser.Scene
{
    constructor()
    {
        super('lobby')
    }

    create(data: IPlayerData)
    {
        const { width, height } = this.scale
        let text = 'welcome ' + data.username


        this.add.text(width * 0.5, height * 0.5, text).setOrigin(0.5)
    }
}