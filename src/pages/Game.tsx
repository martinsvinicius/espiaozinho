import { Flex, Image, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { PlayersContext } from '../contexts/PlayersContext'

function Game() {
  const { players } = useContext(PlayersContext)

  const [game, setGame] = useState<string[]>([])

  const populateGameAndShuffle = () => {
    // populating game array
    let newGame: string[] = []

    for (let i = 0; i < players.length; i += 1) {
      if (i < players.length - 1) {
        newGame = [...newGame, 'Pizzaria']
      } else {
        newGame = [...newGame, 'Espião']
      }
    }

    // shuffling game array
    newGame = newGame
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    setGame(newGame)
  }

  useEffect(() => {
    populateGameAndShuffle()
  }, [])

  const [revealCount, setRevealCount] = useState(1)
  const [playerCount, setPlayerCount] = useState(0)

  const [role, setRole] = useState<string>('???')
  const [image, setImage] = useState<string>('assets/icons/spy-question.svg')
  const [message, setMessage] = useState<string>('Aperte para revelar')

  const handleNextPlayer = () => {
    let currentRevealCount = revealCount
    let currentPlayerCount = playerCount

    if (currentRevealCount < players.length * 2) {
      currentRevealCount += 1

      if (currentRevealCount % 2 === 0) {
        setRole(game[playerCount])
        setMessage('Aperte para passar ao próximo jogador')

        if (game[currentPlayerCount] === 'Espião') {
          setImage('assets/icons/spy-lg.svg')
        } else {
          setImage('assets/icons/crowd.svg')
        }
      } else {
        currentPlayerCount += 1
        setRole('???')
        setMessage('Aperte para revelar')
        setImage('assets/icons/spy-question.svg')
      }
    }

    setRevealCount(currentRevealCount)
    setPlayerCount(currentPlayerCount)
  }

  return (
    <Flex mx="auto" align="center" justify="center" h="100vh" flexDir="column">
      <Text
        fontSize={18}
        fontWeight="medium"
        color="purple.50"
        w="60%"
        textAlign="center"
        mb={2}
      >
        {message}
      </Text>
      <Flex
        as="button"
        onClick={handleNextPlayer}
        direction="column"
        align="center"
        bgColor="purple.500"
        borderRadius={20}
        px={20}
        py={10}
      >
        <Text fontSize={36} color="white" fontWeight="bold" mb={5}>
          {players[playerCount].name}
        </Text>
        <Image src={image} alt="Spy with a question mark" />
        <Text fontSize={36} color="white" fontWeight="medium" mt={5}>
          {role}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Game
