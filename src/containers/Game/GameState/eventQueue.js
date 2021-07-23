import { useRef } from 'react'

function createEventQueue(createActions) {
  const eventQueue = useRef([])
  const newEvent = (event) => eventQueue.current.push(event)

  const actions = createActions(newEvent)

  return { eventQueue, newEvent, actions }
}
export { createEventQueue }

export default createEventQueue
