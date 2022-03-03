import {
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Flex,
} from '@chakra-ui/react'
import { FormEvent, useContext, useRef } from 'react'
import { toast } from 'react-toastify'
import { PlayersContext } from '../../contexts/PlayersContext'
import { PlaceTag } from '../PlaceTag'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    createdPlaces,
    handleAddPlace,
    handleRemovePlace,
    timer,
    handleChangeTimer,
  } = useContext(PlayersContext)
  const newPlace = useRef<HTMLInputElement>(null)

  const onAddPlace = (e?: FormEvent) => {
    e?.preventDefault()

    if (
      !newPlace.current ||
      !newPlace.current.value ||
      newPlace.current.value === ''
    ) {
      toast('Lugar não informado', {
        type: 'error',
      })
      return
    }

    handleAddPlace(newPlace.current.value)
    toast(`Novo lugar (${newPlace.current.value}) adicionado!`, {
      type: 'success',
    })
    newPlace.current.value = ''
  }

  const onChangeTimer = (isAdding: boolean) => {
    if (isAdding) {
      if (timer === 30) {
        toast('Tempo máximo!', {
          type: 'warning',
        })
        return
      }

      handleChangeTimer(true)
    } else {
      if (timer === 1) {
        toast('Tempo mínimo!', {
          type: 'warning',
        })
        return
      }

      handleChangeTimer(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="purple.500" w="90vw">
        <ModalCloseButton color="white" />
        <ModalBody display="flex" flexDir="column" alignItems="center" w="100%">
          <Text fontSize={24} fontWeight="bold" color="white" padding={4}>
            Adicionar lugares +
          </Text>
          <Flex padding={4} align="center">
            <Flex as="form" onSubmit={onAddPlace}>
              <Input
                name="newPlace"
                placeholder="Digite o lugar..."
                variant="filled"
                colorScheme="white"
                focusBorderColor="white"
                borderRadius={20}
                autoFocus
                _focus={{
                  bgColor: 'white',
                }}
                ref={newPlace}
                autoComplete="off"
              />
            </Flex>
            <Image
              src="assets/icons/done.svg"
              alt="Done"
              as="input"
              type="image"
              w="36px"
              h="36px"
              ml={2}
              onClick={onAddPlace}
              _hover={{
                cursor: 'pointer',
              }}
            />
          </Flex>

          <Flex maxW="90%" flexWrap="wrap" justify="center">
            {createdPlaces.map((place) => (
              <PlaceTag
                key={place}
                place={place}
                onClick={() => handleRemovePlace(place)}
              />
            ))}
          </Flex>

          <Text fontSize={24} fontWeight="bold" color="white" padding={4}>
            Definir tempo de jogo
          </Text>
          <Flex padding={4} align="center">
            <Image
              src="assets/icons/red-remove.svg"
              alt="Remove"
              cursor="pointer"
              onClick={() => onChangeTimer(false)}
            />
            <Flex as="form" mx={5}>
              <Input
                name="timer"
                variant="filled"
                colorScheme="white"
                focusBorderColor="white"
                borderRadius={20}
                autoFocus
                _focus={{
                  bgColor: 'white',
                }}
                value={timer}
                autoComplete="off"
                type="number"
                maxW="100px"
                textAlign="center"
                readOnly
              />
            </Flex>
            <Image
              src="assets/icons/green-add.svg"
              alt="Add"
              cursor="pointer"
              onClick={() => onChangeTimer(true)}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
