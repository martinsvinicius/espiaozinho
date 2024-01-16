import { Text, Flex, Button, Progress } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingsContext } from '../../contexts/SettingsContext'

export function Timer() {
  const navigate = useNavigate()

  const { timer } = useContext(SettingsContext)

  const initialTimer = timer

  const [minutes, setMinutes] = useState(initialTimer)
  const [seconds, setSeconds] = useState(0)
  const [timedOutColor, setTimedOutColor] = useState<'red.500' | 'purple.500'>(
    'purple.500'
  )

  useEffect(() => {
    let interval: NodeJS.Timer
    if (!(minutes === 0 && seconds === 0)) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1)
        if (seconds === 0) {
          setMinutes((min) => min - 1)
          setSeconds(59)
        }
      }, 1000)
    } else {
      setTimedOutColor('red.500')
    }

    return () => clearInterval(interval)
  }, [seconds])

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        setTimedOutColor(timedOutColor === 'red.500' ? 'purple.500' : 'red.500')
      }
    }, 500)

    return () => clearInterval(interval)
  }, [timedOutColor])

  const onGameOver = () => navigate('/')

  const progressPercents =
    ((minutes * 60 + seconds) / (initialTimer * 60)) * 100

  return (
    <Flex
      px="2rem"
      w="100%"
      h="100%"
      minH="100vh"
      mx="auto"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      maxWidth="520px"
    >
      <Flex borderRadius={8} bgColor="purple.500" w="100%" flexDir="column">
        <Flex
          letterSpacing={2}
          color={seconds === 0 && minutes === 0 ? timedOutColor : 'white'}
          fontWeight="bold"
          p="1.5rem 2rem"
          alignItems="center"
          justifyContent="center"
          fontSize="4rem"
        >
          <Text>{minutes <= 9 ? `0${minutes}` : minutes}</Text>:
          <Text>{seconds <= 9 ? `0${seconds}` : seconds}</Text>
        </Flex>
        <Progress
          w="100%"
          hasStripe
          value={progressPercents}
          size="lg"
          colorScheme="red"
          isAnimated
          borderBottomRadius={8}
        />
      </Flex>

      <Button
        w="100%"
        textTransform="uppercase"
        mt={8}
        py={6}
        colorScheme="red"
        onClick={onGameOver}
      >
        Finalizar Partida!
      </Button>
    </Flex>
  )
}
