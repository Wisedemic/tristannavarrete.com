import { Fragment, useContext } from 'react'
import {
  Flex,
  Button,
  Stat,
  StatNumber,
  StatLabel,
  Heading,
  Stack,
  Text,
  CloseButton,
  Icon,
  Progress
} from '@chakra-ui/core'
import { GameContext } from './Game'

const floating = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  m: '0'
}

function GamePresentation() {
  const context = useContext(GameContext)
  const { gameState, gameActions } = context
  console.log(gameState)
  return (
    <Stack position="relative">
      {/* {GameLoop.eventQueue && GameLoop.eventQueue.length > 0 && (
              <Stack {...floating}>{GameLoop.eventQueue.map((event) => event)}</Stack>
            )} */}
      {gameState.gameLost && (
        <Stack
          {...floating}
          direction="column"
          justify="center"
          align="center"
          bg="white"
          zIndex="100"
        >
          <Text>Ruh-roh Raggy!</Text>
          <Heading size="xl">GAME OVER</Heading>
          <Text>{`All your monkey's died! :((((`}</Text>
          <Stack isInline margin="2">
            <Button variantColor="red" rightIcon="arrow-back">
              Return to Site
            </Button>
            <Button
              variantColor="green"
              onClick={gameActions.restartGame}
              rightIcon="repeat"
            >
              Restart?
            </Button>
          </Stack>
        </Stack>
      )}
      {gameState.viewingRules && (
        <Stack
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="auto"
          zIndex="100"
          bg="gray.300"
          boxShadow="md"
          margin="2"
          p="2"
          spacing="2"
        >
          <CloseButton onClick={() => setRules(false)} />
          <Text>1. Monkeys die every 3s</Text>
          <Text>2. Monkeys get hungry if they don't eat! </Text>
        </Stack>
      )}
      {!gameState.initialized && !gameState.gameLost && (
        <Fragment>
          <Stack
            position="absolute"
            top="2.5em"
            bottom="0"
            left="0"
            right="0"
            m="0"
            p="4"
            marginBottom="0"
            direction="column"
            align="center"
            bg="white"
            zIndex="100"
            opacity="0.76"
          >
            <Icon size="2em" name="arrow-up" />
            <Text>Ready?</Text>
          </Stack>
          <Button
            variantColor="green"
            onClick={gameActions.startGame}
            borderRadius={0}
          >
            Start Game
          </Button>
          <progress
            value={gameState.initialized ? gameState.globalTime : 0}
            max={gameState.globalCooldown}
            style={{ width: '100%' }}
          />
        </Fragment>
      )}
      <Flex bg="gray.100" m={0} p={2}>
        <Button onClick={gameState.toggleRules}>Rules</Button>
      </Flex>
      <Flex bg="gray.100" p={2} direction="column">
        <Heading as="h4">Stats</Heading>
        <Flex py={1}>
          <Stat>
            <StatLabel>Avail. Monkeys</StatLabel>
            <StatNumber>{gameState.monkeys}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Hungry Mouths / gTime</StatLabel>
            <StatNumber>{gameState.monkeys}</StatNumber>
          </Stat>
        </Flex>
        <Flex py={1}>
          <Stat>
            <StatLabel>Food Supply</StatLabel>
            <StatNumber>{gameState.foodSupply}</StatNumber>
          </Stat>
        </Flex>
      </Flex>

      <Flex bg="gray.50" p={2} direction="column">
        <Heading as="h4">Jobs</Heading>
        <Flex py={1}>
          <Button
            variantColor="blue"
            onClick={gameActions.collectBanana}
            disabled={gameState.monkeys < 1}
          >
            Collect Bananas
          </Button>
          <Button
            variantColor="blue"
            onClick={gameActions.spawn}
            disabled={gameState.foodSupply < gameState.spawnRequirement}
          >
            Spawn
          </Button>
          <Button
            variantColor="blue"
            //   onClick={() => setFoodSupply(foodSupply + 1)}
            disabled={gameState.monkeys < 1}
          ></Button>
        </Flex>
      </Flex>
    </Stack>
  )
}

export { GamePresentation }

export default GamePresentation
