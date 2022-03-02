import { Flex, Image, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { PlayersContext } from '../contexts/PlayersContext'

function Game() {
  const { players } = useContext(PlayersContext)

  const [game, setGame] = useState<string[]>([])

  const populateGame = () => {
    let newGame: string[] = []

    for (let i = 0; i < players.length; i += 1) {
      if (i < players.length - 1) {
        newGame = [...newGame, 'Cabaré']
      } else {
        newGame = [...newGame, 'Espião']
      }
    }

    setGame(newGame)
  }

  useEffect(() => {
    populateGame()
  }, [])

  const shufflePlayers = (unshuffled: string[]) => {
    const shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    return shuffled
  }

  return (
    <Flex mx="auto" align="center" justify="center" h="100vh" flexDir="column">
      <Text fontSize={22} fontWeight="medium" color="purple.50">
        Aperte para revelar
      </Text>
      <Flex
        as="button"
        onClick={() => shufflePlayers(game)}
        direction="column"
        align="center"
        bgColor="purple.500"
        borderRadius={20}
        px={20}
        py={10}
      >
        <Text fontSize={36} color="white" fontWeight="bold" mb={5}>
          Rodrigo
        </Text>
        <Image
          src="assets/icons/spyquestion.svg"
          alt="Spy with a question mark"
        />
        <Text fontSize={36} color="white" fontWeight="medium" mt={5}>
          ???
        </Text>
      </Flex>
    </Flex>
  )
}

export default Game
