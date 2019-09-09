import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import { createContainer, useContainer } from 'unstated-next'
import hrtimeMs from './hrtimeMs'

const runningState = () => {
  let [running, setRunning] = useState(false)
  return { running, setRunning }
}

export const RunningState = createContainer(runningState)

export const useRAF = callback => {
  // Counter for Frames painted
  let [state, setState] = useState({
    previous: false,
    ticks: 0
  })
  let { running, setRunning } = useContainer(RunningState)

  // Take a reference to some fn that we want to call.
  // i.e: updateGame(), updateState(), paintFrame()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  // Create an arbitrary elem to hold the frame reference.
  const frameRef = useRef()

  // The Frame being painted. OR: the Loop
  const onFrame = useCallback(() => {
    if (!running) return

    // Paint / Update / Execute the current frame
    frameRef.current = requestAnimationFrame(onFrame)

    // Call the current callback reference
    const cb = callbackRef.current
    if (!state.previous) {
      setState({
        ticks: ++state.ticks,
        previous: hrtimeMs()
      })
    } else {
      const time = hrtimeMs()

      cb(time - state.previous)
      setState({
        ticks: ++state.ticks,
        previous: time
      })
    }
  })

  // Return a fn that runs the frame-Loop on every DOM paint: runs sync.
  useLayoutEffect(() => {
    setRunning(true)
    frameRef.current = requestAnimationFrame(onFrame)
    // Return when unmounted.
    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [onFrame, setRunning])
}

export default useRAF
