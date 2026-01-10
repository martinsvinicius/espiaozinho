import { Flex, Image, Text } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'

interface PlayerBoxProps {
  id: string
  name: string
  color: string
}

export function PlayerBox({ id, name, color }: PlayerBoxProps) {
  const { handleRemovePlayer, handleChangeSpiesQuantity } =
    useContext(SettingsContext)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

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

  const onClickRemovePlayer = (playerName: string) => {
    handleChangeSpiesQuantity(false)
    handleRemovePlayer(playerName)
  }

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      w="100%"
      justify="space-between"
      px={10}
      py={3}
      bg={isDragging ? 'purple.600' : 'transparent'}
      borderRadius={8}
    >
      <Flex
        {...attributes}
        {...listeners}
        cursor="grab"
        _active={{ cursor: 'grabbing' }}
        align="center"
        flex={1}
      >
        <Image src="assets/icons/spy.svg" alt="Spy" filter={imageColor()} />
        <Text color="white" fontSize={18} fontWeight="medium" ml={4}>
          {name}
        </Text>
      </Flex>
      <Image
        onClick={() => onClickRemovePlayer(name)}
        src="assets/icons/remove.svg"
        alt="Remove"
        _hover={{
          cursor: 'pointer',
        }}
      />
    </Flex>
  )
}
