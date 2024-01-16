/* eslint-disable no-shadow */
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Timer } from '../../components/Timer'

import { places } from '../../constants/places'
import { SettingsContext } from '../../contexts/SettingsContext'
import { populateGameAndShuffle } from '../../utils/GameUtils'

export function Game() {
  const navigate = useNavigate()
  const { players, spiesQuantity, createdPlaces, spiesShouldKnowEachOther } =
    useContext(SettingsContext)

  const playablePlaces = [...places, ...createdPlaces]

  const canPlay = players.length >= 3
  const [showStartGameButton, setShowStartGameButton] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const [revealCount, setRevealCount] = useState(1)
  const [playerCount, setPlayerCount] = useState(0)

  const [role, setRole] = useState('???')
  const [image, setImage] = useState('assets/icons/spy-question.svg')
  const [message, setMessage] = useState('Aperte para revelar')

  const { game, spies } = useMemo(() => {
    const game = populateGameAndShuffle(playablePlaces, players, spiesQuantity)
    const spies = players.filter((_, i) => game[i] === 'Espião')
    return { game, spies }
  }, [players, spiesQuantity])

  const isSpiesVisible = useMemo(
    () =>
      role === 'Espião' &&
      revealCount % 2 === 0 &&
      spies.length >= 2 &&
      spiesShouldKnowEachOther,
    [role, revealCount, spies, spiesShouldKnowEachOther]
  )

  useEffect(() => {
    if (!canPlay) navigate('/')
  }, [])

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
    } else {
      setShowStartGameButton(true)
    }

    setRevealCount(currentRevealCount)
    setPlayerCount(currentPlayerCount)
  }

  const handleStartGame = () => setGameStarted(true)

  if (!canPlay) {
    return (
      <Text
        fontSize={18}
        fontWeight="bold"
        color="purple.50"
        textAlign="center"
      >
        Redirecionando...
      </Text>
    )
  }

  return gameStarted ? (
    <Timer />
  ) : (
    <Flex mx="auto" align="center" justify="center" h="100vh" flexDir="column">
      {showStartGameButton ? (
        <>
          <Text fontSize={22} color="white">
            Tudo pronto!
          </Text>
          <Button
            borderRadius={20}
            py={6}
            px={10}
            textTransform="uppercase"
            colorScheme="green"
            mt="2rem"
            onClick={handleStartGame}
          >
            Começar Partida!
          </Button>
        </>
      ) : (
        <>
          <Text
            fontSize={22}
            fontWeight="medium"
            color="purple.50"
            w="60%"
            textAlign="center"
            mb="1.5rem"
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

          {isSpiesVisible && (
            <Text fontSize={18} color="gray" fontWeight="medium" mt={5}>
              {`${
                spies.length - 1 === 1
                  ? 'O outro espião é'
                  : 'Os outros espiões são'
              }
              ${spies
                .filter((spy) => spy.name !== players[playerCount].name)
                .map((spy) => spy.name)
                .join(', ')}`}
            </Text>
          )}
        </>
      )}
    </Flex>
  )
}
