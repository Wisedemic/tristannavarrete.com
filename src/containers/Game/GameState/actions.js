const createActions = (dispatch) => ({
  globalCooldown: (deltaTime) => {
    dispatch({ action: 'tick', deltaTime })
  },
  startGame: () => {
    dispatch({ action: 'start' })
  },
  restartGame: () => {
    dispatch({ action: 'restart' })
  },
  gameOver: () => {
    dispatch({ action: 'lost' })
  },
  spawn: () => {
    dispatch({ action: 'spawn', amount: 1 })
  },
  collectBanana: () => {
    dispatch({ action: 'collect', amount: 1 })
  }
})

export { createActions }

export default createActions
