import React, { useState, useEffect } from 'react'
import MonkeyGamePresentation from './MonkeyGamePresentation'
import { getStore } from './store'
import { Skeleton } from 'antd'
import { GameState } from './gameState'
import { useRAF, RunningState } from '../../hooks/useRequestAnimationFrame'
import { useContainer } from 'unstated-next'
import CardPanel from '../../components/CardPanel'

const GameWrapper = props => (
  <GameState.Provider>
    <RunningState.Provider>
      <MonkeyGame {...props} />
    </RunningState.Provider>
  </GameState.Provider>
)

const MonkeyGame = ({ title }) => {
  let [isLoading, setLoading] = useState(true)
  let { running } = useContainer(RunningState)
  let { updateGame } = useContainer(GameState)

  useRAF(updateGame)

  useEffect(() => {
    if (!running) setLoading(true)
    else setLoading(false)
  }, [running])

  return (
    <CardPanel title={title}>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <MonkeyGamePresentation setLoading={setLoading} />
      )}
    </CardPanel>
  )
}

// class MonkeyGame extends Component {
//   store = undefined
//   SHUTDOWN = false
//   frames = 0
//   FPS = 20
//   FPS_length_ms = 1000 / this.FPS
//   previous_frame = undefined

//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: true,
//       gameState: undefined
//     }

//     this.updateFPS = this.updateFPS.bind(this)
//     this.shutdownGame = this.shutdownGame.bind(this)
//     this.startGame = this.startGame.bind(this)
//     this.gameLoop = this.gameLoop.bind(this)
//     this.updateGame = this.updateGame.bind(this)
//   }

//   updateFPS(newRate) {
//     this.FPS = newRate
//     this.FPSLengthMs = 1000 / this.FPS
//   }

//   shutdownGame() {
//     this.SHUTDOWN = true
//   }

//   startGame() {
//     this.previous_frame = hrtime()
//     this.gameLoop()
//   }

//   updateGame(delta) {
//     // Check for events
//   }

//   gameLoop() {
//     if (this.SHUTDOWN) return
//     setTimeout(this.gameLoop, this.FPS_length_ms)
//     let now = hrtime()
//     const delta = hrtime(now)
//     console.log('delta', delta)
//     this.updateGame(delta) // game logic would go here
//     this.previous_frame = now
//     this.frames++
//     this.gameLoop() // starts the loop again
//   }

//   componentDidMount() {
//     this.store = getStore()
//     console.log(this.store)
//     if (this.store) {
//       if (this.store.has('SavedMonkeyGameData')) {
//         const gameState = JSON.parse(this.store.get('SavedMonkeyGameData'))
//         this.setState({ gameState })
//         this.setState({ loading: false })
//         this.startGame()
//       } else {
//         this.resetGame()
//       }
//     } else {
//       throw new Error('localStorage not available from MonkeyGame')
//     }
//   }

//   render() {
//     return (
//       <GameStateProvider>
//         <Card>{this.state.loading ? <Skeleton active /> : <MonkeyGamePresentation />}</Card>
//       </GameStateProvider>
//     )
//   }
// }

export default GameWrapper
