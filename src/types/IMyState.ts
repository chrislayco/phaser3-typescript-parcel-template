import { Schema, ArraySchema } from '@colyseus/schema'
export enum Cell{
    Empty,
    X,
    O
}

export enum GameState{
    Waiting,
    Playing,
    Finished
}

export interface IMyState extends Schema
{
    gameState: GameState

    board: ArraySchema<Cell>

    activePlayer: number

    winnerPlayer: number

}

export default IMyState