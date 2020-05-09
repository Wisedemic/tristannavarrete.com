import { useReducer } from 'react'
import { createContainer } from 'unstated-next'
import {
  INCREMENT_BANANA,
  INCREMENT_RECRUITS,
  INCREMENT_TREES,
  INCREMENT_PLANTATIONS,
  INCREMENT_NANACTORIES,
  INSUFFICENT_FUNDS,
  INCREMENT_TIME_ELAPSED
} from './actions'
import { reducer, initialState as initialGameState } from './reducer'

function gameState(initialState = initialGameState) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Delta is the change in change in time since the last frame.
  // Here, we assume this is accurate: letting the GameLoop logic handle this problem.
  function updateGame(delta) {
    if (!delta) return
    else dispatch({ type: INCREMENT_TIME_ELAPSED, delta })
  }

  function calcBuildPercentRemaining(techType) {
    const tech = state.tech[techType]
    const delta = state.timeElapsed - tech.startedAt
    return (delta / tech.buildTime(tech.count)) * 100
  }

  function calcCost(techType) {
    const tech = state.tech[techType]
    return tech.costFactor(tech.count)
  }

  function canPurchase(techType) {
    return calcCost(techType) <= state.bananas
  }

  function collectBanana(amount) {
    dispatch({ type: INCREMENT_BANANA, amount })
  }

  function recruitMonkey(amount) {
    const cost = calcCost('recruits')
    if (canPurchase('recruits'))
      dispatch({ type: INCREMENT_RECRUITS, amount, cost })
    else dispatch({ type: INSUFFICENT_FUNDS })
  }

  function plantTree(amount) {
    const cost = calcCost('trees')
    if (canPurchase('trees')) dispatch({ type: INCREMENT_TREES, amount, cost })
  }

  function buildPlantation(amount) {
    const cost = calcCost('plantations')
    if (canPurchase('plantations'))
      dispatch({ type: INCREMENT_PLANTATIONS, amount, cost })
  }

  function spawnNanactory(amount) {
    const cost = calcCost('nanactories')
    if (canPurchase('nanactories'))
      dispatch({ type: INCREMENT_NANACTORIES, amount, cost })
  }

  return {
    bananas: state.bananas,
    recruits: state.tech.recruits.count,
    trees: state.tech.trees.count,
    plantations: state.tech.plantations.count,
    nanactories: state.tech.nanactories.count,
    updateGame,
    calcBuildPercentRemaining,
    calcCost,
    canPurchase,
    collectBanana,
    recruitMonkey,
    plantTree,
    buildPlantation,
    spawnNanactory
  }
}

export const GameState = createContainer(gameState)
