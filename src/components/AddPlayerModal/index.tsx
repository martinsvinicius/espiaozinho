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

interface AddPlayerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPlayerModal({ isOpen, onClose }: AddPlayerModalProps) {
  const { handleAddPlayer } = useContext(PlayersContext)
  const newPlayer = useRef<HTMLInputElement>(null)

  const onAddPlayer = (e?: FormEvent) => {
    e?.preventDefault()

    if (
      !newPlayer.current ||
      !newPlayer.current.value ||
      newPlayer.current.value === ''
    ) {
      toast('Nome do jogador não informado', {
        type: 'error',
      })
      return
    }

    handleAddPlayer(newPlayer.current.value)
    newPlayer.current.value = ''
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="purple.500" w="90vw">
        <ModalCloseButton color="white" />
        <ModalBody display="flex" flexDir="column" alignItems="center" w="100%">
          <Text fontSize={24} fontWeight="bold" color="white" padding={4}>
            Novo jogador +
          </Text>
          <Flex padding={4} align="center">
            <Flex as="form" onSubmit={onAddPlayer}>
              <Input
                name="newPlayer"
                placeholder="Digite o nome..."
                variant="filled"
                colorScheme="white"
                focusBorderColor="white"
                borderRadius={20}
                autoFocus
                _focus={{
                  bgColor: 'white',
                }}
                ref={newPlayer}
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
              onClick={onAddPlayer}
              _hover={{
                cursor: 'pointer',
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
