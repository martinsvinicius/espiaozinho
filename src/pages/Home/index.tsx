import { Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AddPlayerModal } from '../../components/AddPlayerModal'
import { LineButton } from '../../components/LineButton'
import { PlayerBox } from '../../components/PlayerBox'
import { PlayersContext } from '../../contexts/PlayersContext'

export function Home() {
  const { players } = useContext(PlayersContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex mx="auto" align="center" justify="center" h="100vh" flexDir="column">
      <Text fontSize={48} fontWeight="bold" color="purple.500">
        espiãozinho
      </Text>

      <LineButton text="Adicionar lugares +" mt={8} />

      <LineButton text="Adicionar jogadores +" mt={4} onClick={onOpen} />

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

      <AddPlayerModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
