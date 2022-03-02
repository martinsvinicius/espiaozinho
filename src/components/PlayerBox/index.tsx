import { Flex, Image, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { PlayersContext } from '../../contexts/PlayersContext'

interface PlayerBoxProps {
  name: string
  color: string
}

export function PlayerBox({ name, color }: PlayerBoxProps) {
  const { handleRemovePlayer } = useContext(PlayersContext)

  const red =
    'invert(37%) sepia(98%) saturate(7489%) hue-rotate(356deg) brightness(107%) contrast(123%)'
  const blue =
    'invert(8%) sepia(100%) saturate(6400%) hue-rotate(246deg) brightness(107%) contrast(147%)'
  const yellow =
    'invert(98%) sepia(68%) saturate(2872%) hue-rotate(356deg) brightness(105%) contrast(102%)'

  const imageColor = () => {
    switch (color) {
      case 'red':
        return red
      case 'blue':
        return blue
      case 'yellow':
        return yellow
      default:
        return 'red'
    }
  }

  return (
    <Flex w="100%" justify="space-between" px={10} py={3}>
      <Flex>
        <Image src="assets/icons/spy.svg" alt="Spy" filter={imageColor()} />
        <Text color="white" fontSize={18} fontWeight="medium" ml={4}>
          {name}
        </Text>
      </Flex>
      <Image
        onClick={(e) => handleRemovePlayer(name)}
        src="assets/icons/remove.svg"
        alt="Remove"
        _hover={{
          cursor: 'pointer',
        }}
      />
    </Flex>
  )
}
