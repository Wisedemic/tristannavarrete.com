import { useRef, useEffect, useState } from 'react'

const config = {}

function afterUpdateContext(context) {}

function updateContext(context) {
  context.fillStyle = '#66ff66'
  context.strokeStyle = '#990000'
  // context.arc(
  //   canvasRef.current.width / 2,
  //   canvasRef.current.height / 2,
  //   2,
  //   2
  // )
}

export default () => {
  const canvasRef = useRef(null)
  const [context, setContext] = useState(null)

  /// THE IDEA HERE IS TO CREATE SOMETHING THAT FOLLOWS THE MOUSE AND ANIMATES.
  // SHOULD IMPRESS SOMEONE. IDK.

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d')
      if (renderCtx) setContext(renderCtx)
      if (context) updateContext(context)
      if (context) afterUpdateContext(context)
    }
  }, [context])

  return <canvas ref={canvasRef} />
}
