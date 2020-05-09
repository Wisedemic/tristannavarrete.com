import {
  INCREMENT_BANANA,
  INCREMENT_RECRUITS,
  INCREMENT_TREES,
  INCREMENT_PLANTATIONS,
  INCREMENT_NANACTORIES,
  INSUFFICENT_FUNDS,
  INCREMENT_TIME_ELAPSED
} from './actions'

export const initialState = {
  bananas: Number(0),
  timeElapsed: 0,
  tech: {
    recruits: {
      name: 'Recruits',
      buildTime: num => 5000 - (3 ^ num),
      costFactor: num => 1 + (2 ^ num),
      rewardFactor: num => 2 + num * (1.1 ^ num),
      count: Number(0),
      startedAt: false // a reference to the time-elapsed (in ms) in the game.
    },
    trees: {
      name: 'Trees',
      buildTime: num => 10000 - (3 ^ num),
      costFactor: num => 50 + (3 ^ num),
      rewardFactor: num => 10 + num * (1.1 ^ num),
      count: Number(0),
      startedAt: false // a reference to the time-elapsed (in ms) in the game.
    },
    plantations: {
      name: 'Plantations',
      buildTime: num => 20000 - (3 ^ num),
      costFactor: num => 200 + (4 ^ num),
      rewardFactor: num => 200 + num * (1.1 ^ num),
      count: Number(0),
      startedAt: false // a reference to the time-elapsed (in ms) in the game.
    },
    nanactories: {
      name: 'Nanactories',
      buildTime: num => 40000 - (4 ^ num),
      costFactor: num => 800 + (5 ^ num),
      rewardFactor: num => 2000 + num * (1.1 ^ num),
      count: Number(0),
      startedAt: false // a reference to the time-elapsed (in ms) in the game.
    }
  }
}

function startWorkOnIncrement(action, state, techType) {
  const tech = state.tech[techType]
  if (!tech.startedAt && tech.count === 0) {
    console.log(`Setting ${tech.name} @state.timeElapsed: ${state.timeElapsed}`)
    return {
      ...state,
      bananas: state.bananas - action.cost,
      tech: {
        ...state.tech,
        [techType]: {
          ...tech,
          count: tech.count + action.amount,
          startedAt: state.timeElapsed
        }
      }
    }
  } else {
    return {
      ...state,
      bananas: state.bananas - action.cost,
      tech: {
        ...state.tech,
        [techType]: { ...tech, count: tech.count + action.amount }
      }
    }
  }
}

/*
 When we increment timeElapsed, we return newState
 so that we can continue modifying state before
 submitting the reducer action for rendering */
function incrementTimeElapsed(state, action) {
  let newState = { ...state, timeElapsed: state.timeElapsed + action.delta }
  return newState
}

function _buildComplete(state, techType) {
  const tech = state.tech[techType]
  return {
    ...state,
    bananas: state.bananas + tech.rewardFactor(tech.count),
    tech: {
      ...state.tech,
      [techType]: {
        ...tech,
        startedAt: tech.startedAt + tech.buildTime(tech.count)
      }
    }
  }
}

function incrementTechStarts(state) {
  let newState = { ...state }
  Object.keys(state.tech).map(techType => {
    if (state.tech[techType].startedAt) {
      const times_completed = Math.floor(
        (state.timeElapsed - state.tech[techType].startedAt) / // Delta
          state.tech[techType].buildTime(state.tech[techType].count) // / tech buildTime.
      )
      if (times_completed >= 2) {
        for (let i = 0; i >= times_completed; i++) {
          newState = _buildComplete(state, techType)
        }
      } else if (times_completed >= 1) {
        newState = _buildComplete(state, techType)
      }
    }
  })
  return newState
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_BANANA:
      return { ...state, bananas: state.bananas + action.amount }
    case INCREMENT_RECRUITS:
      return startWorkOnIncrement(action, state, 'recruits')
    case INCREMENT_TREES:
      return startWorkOnIncrement(action, state, 'trees')
    case INCREMENT_PLANTATIONS:
      return startWorkOnIncrement(action, state, 'plantations')
    case INCREMENT_NANACTORIES:
      return startWorkOnIncrement(action, state, 'nanactories')
    case INCREMENT_TIME_ELAPSED:
      return incrementTechStarts(incrementTimeElapsed(state, action))
    case INSUFFICENT_FUNDS:
      return state
    default:
      throw new Error()
  }
}
