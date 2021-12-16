import type Server from '../client/services/Server'


export interface IGameOverSceneData
{
    winner: number
    onRestart?: () => void
}

export interface IGameSceneData
{
    server: Server
    onGameOver: (data: {winner: boolean}) => void
}