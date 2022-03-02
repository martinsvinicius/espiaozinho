import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LineButton } from '../components/LineButton'
import { PlayerBox } from '../components/PlayerBox'
import { PlayersContext } from '../contexts/PlayersContext'

function App() {
  const { players, setNewPlayer, handleAddPlayer } = useContext(PlayersContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChangeNewPlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayer(e.target.value)
  }

  return (
    <Flex mx="auto" align="center" justify="center" h="100vh" flexDir="column">
      <Text fontSize={48} fontWeight="bold" color="purple.500">
        espiãozinho
      </Text>

      <LineButton text="Adicionar lugares +" mt={8} />

      <LineButton text="Adicionar jogadores +" mt={4} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="purple.500" w="90vw">
          <ModalCloseButton color="white" />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            w="100%"
          >
            <Text fontSize={24} fontWeight="bold" color="white" padding={4}>
              Novo jogador +
            </Text>
            <Flex padding={4} align="center">
              <Input
                onChange={handleChangeNewPlayer}
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
              />
              <Image
                src="assets/icons/done.svg"
                alt="Done"
                as="input"
                type="image"
                w="36px"
                h="36px"
                ml={2}
                onClick={handleAddPlayer}
                _hover={{
                  cursor: 'pointer',
                }}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack
        spacing={3}
        py={4}
        mt={8}
        w="60%"
        maxH="400px"
        overflowY="auto"
        maxW="390px"
        bgColor="purple.500"
        borderRadius={16}
      >
        {players.map((player) => (
          <PlayerBox
            key={player.name}
            name={player.name}
            color={player.color}
          />
        ))}
        {players.length === 0 && (
          <Text
            padding={10}
            color="white"
            fontWeight="medium"
            textAlign="center"
          >
            Nenhum jogador adicionado
          </Text>
        )}
      </VStack>

      <Link
        to="/game"
        style={{
          marginTop: '45px',
        }}
      >
        <Button
          isDisabled={players.length < 3}
          bgColor="purple.500"
          color="white"
          maxW="160px"
          py={8}
          px={14}
          borderRadius="16px"
          transition="all 0.3s"
          _hover={{
            filter: 'brightness(110%)',
          }}
        >
          JOGAR
        </Button>
      </Link>
    </Flex>
  )
}

export default App
