export enum Cell{
    Empty,
    X,
    O
}

export interface IMyState
{
    board: Cell[]

    activePlayer: number
}

export default IMyState