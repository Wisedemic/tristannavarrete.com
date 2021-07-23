import { useState } from 'react'
import { merge } from 'lodash'
import createEventQueue from './eventQueue'
import { createActions } from './actions'

const initialState = {
  globalTime: 0,
  globalCooldown: 1000,
  playTime: 0,
  initialized: false,
  running: false,
  gameLost: false,
  viewingRules: false,
  monkeys: 1,
  foodSupply: 10,
}

function updateGlobalTime(currentState, newGTime) {
  return newGTime > currentState.globalCooldown
    ? newGTime - currentState.globalCooldown
    : newGTime
}

function updateFoodSupply(currentState, newGTime) {
  return newGTime > currentState.globalCooldown
    ? currentState.foodSupply - currentState.monkeys
    : currentState.foodSupply
}

function stateReducer(currentState, event, deltaTime) {
  switch (event.action) {
    case 'collect':
      return {
        ...currentState,
        foodSupply: currentState.foodSupply + event.amount
      }
    case 'spawn':
      return {
        ...currentState,
        monkeys: currentState.monkeys + event.amount
      }

    case 'start':
      return {
        ...currentState,
        initialized: true,
        running: true
      }
    case 'restart':
      return {
        ...initialState, initialized: true,
        running: true
      }
    case 'lost':
      return {
        ...currentState, initialized: false, gameLost: true,
        running: false
      }
    case 'tick':
      const newGTime = currentState.globalTime + deltaTime
      return {
        ...currentState,
        globalTime: updateGlobalTime(currentState, newGTime),
        foodSupply: updateFoodSupply(currentState, newGTime),
        playTime: currentState.playTime + deltaTime
      }

    default:
      return currentState
  }
}

const useGameState = (userConfig) => {
  const config = merge({}, initialState, userConfig)
  const [gameState, updateGameState] = useState(config)
  const { eventQueue, newEvent, actions } = createEventQueue(createActions)

  function scheduleEvents(state, deltaTime) {
    actions.globalCooldown(deltaTime)
  }

  function main(state, deltaTime) {
    if (!state.initialized || !state.running || state.gameLost) return
    const LOSSCONDITION = state.foodSupply - 1 < 0
    LOSSCONDITION ? actions.gameOver() : scheduleEvents(state, deltaTime)
  }

  function gameLoopHandler(deltaTime) {
    updateGameState((currentState) => {
      let finalState = currentState
      if (eventQueue.current.length > 0) {
        eventQueue.current.forEach((event) => {
          finalState = stateReducer(finalState, event, deltaTime)
          main(finalState, deltaTime)
        })
        eventQueue.current.splice(0, eventQueue.current.length)
      } else {
        finalState = stateReducer(finalState, _, deltaTime)
        main(finalState, deltaTime)
      }
      return finalState
    })
  }

  return {
    gameLoopHandler,
    gameActions: {
      newEvent,
      ...actions
    },
    gameState
  }
}

export { useGameState }

export default useGameState
