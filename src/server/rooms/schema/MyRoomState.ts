import { Schema, Context, ArraySchema, type } from "@colyseus/schema"
import IMyState, { Cell } from '../../../types/IMyState'

export default class MyRoomState extends Schema implements IMyState
{
  @type(['number'])
  board: ArraySchema<number>

  @type('number')
  activePlayer = 0

  constructor()
  {
    super()

    this.board = new ArraySchema(
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    )
  }
}