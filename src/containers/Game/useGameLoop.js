import { useEffect, useRef, useCallback } from 'react'

const useGameLoop = (cb = doNothing) => {
  const _onUpdate = useCallback(cb)
  const frame = useRef()
  const prevDeltaTime = useRef()

  const _onFrame = (elapsedTime) => {
    if (prevDeltaTime.current != undefined) {
      const deltaTime = elapsedTime - prevDeltaTime.current
      _onUpdate(deltaTime)
    }
    prevDeltaTime.current = elapsedTime
    frame.current = requestAnimationFrame(_onFrame)
  }

  useEffect(() => {
    frame.current = requestAnimationFrame(_onFrame)
    return () => cancelAnimationFrame(frame.current)
  }, []) // Make sure the effect runs only once

  return { frame, prevDeltaTime }
}

export { useGameLoop }

export default useGameLoop
