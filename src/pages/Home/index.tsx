import {
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AddPlayerModal } from '../../components/AddPlayerModal'
import { LineButton } from '../../components/LineButton'
import { PlayerBox } from '../../components/PlayerBox'
import { SettingsModal } from '../../components/SettingsModal'
import { SettingsContext } from '../../contexts/SettingsContext'

export function Home() {
  const { players } = useContext(SettingsContext)
  const {
    isOpen: isAddPlayerModalOpen,
    onOpen: onOpenAddPlayerModal,
    onClose: onCloseAddPlayerModal,
  } = useDisclosure()

  const {
    isOpen: isSettingsModalOpen,
    onOpen: onOpenSettingsModal,
    onClose: onCloseSettingsModal,
  } = useDisclosure()

  return (
    <Flex
      mx="auto"
      align="center"
      justify="center"
      h="100vh"
      flexDir="column"
      w="100%"
      px="2rem"
      maxWidth="520px"
    >
      <Image
        src="assets/icons/settings.svg"
        alt="Settings"
        position="fixed"
        top="30"
        right="30"
        cursor="pointer"
        onClick={onOpenSettingsModal}
      />

      <Text fontSize={48} fontWeight="bold" color="purple.500">
        espiãozinho
      </Text>

      <LineButton
        text="Adicionar jogadores +"
        mt={4}
        onClick={onOpenAddPlayerModal}
      />

      <VStack
        spacing={3}
        py={8}
        mt={8}
        w="100%"
        maxH="400px"
        overflowY="auto"
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
          colorScheme="green"
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

      <AddPlayerModal
        isOpen={isAddPlayerModalOpen}
        onClose={onCloseAddPlayerModal}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={onCloseSettingsModal}
      />
    </Flex>
  )
}
