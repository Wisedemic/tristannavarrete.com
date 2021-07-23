import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/core'

const Game = dynamic(
  () => import('../containers/Game/Game.js'),
  { ssr: false, loading: () => <Flex bg="black" justify="center" align="center" p="4" color="white">Loading ...</Flex> }
)

export default () => {
  const [loadGame, setLoadGame] = useState(false)
  return (
    <section>
      <Flex bg="gray.500" justify="center" align="center" p="4">
        {loadGame ? <Game /> : <Button onClick={() => setLoadGame(true)}>
          Load Game
      </Button>}
      </Flex>
    </section>
  )
}

