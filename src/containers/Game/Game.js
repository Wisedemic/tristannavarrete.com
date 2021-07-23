import { createContext } from 'react'
import GamePresentation from './GamePresentation'
import useGameLoop from './useGameLoop'
import useGameState from './GameState/useGameState'

const GameContext = createContext()
const { Provider } = GameContext

const Game = ({ children, ...props }) => {
  const { gameState, gameActions, gameLoopHandler } = useGameState(props)
  const gameLoop = useGameLoop(gameLoopHandler)

  const context = {
    gameLoop,
    gameState,
    gameActions
  }

  return <Provider value={context}>{children}</Provider>
}

export { GameContext }

export default () => (
  <Game>
    <GamePresentation />
  </Game>
)
