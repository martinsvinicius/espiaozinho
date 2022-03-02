import { createContext, ReactNode, useMemo, useState } from 'react'
import { Player } from '../types/Player'

interface PlayersContextData {
  players: Player[]
  setPlayers: (players: Player[]) => void
  newPlayer: string
  setNewPlayer: (newPlayer: string) => void
  handleAddPlayer: () => void
  handleRemovePlayer: (playerName: string) => void
}

export const PlayersContext = createContext({} as PlayersContextData)

export function ContextProvider({ children }: { children: ReactNode }) {
  const [newPlayer, setNewPlayer] = useState('')
  const [players, setPlayers] = useState<Player[]>([])

  const [count, setCount] = useState(0)

  const choosePlayerColor = () => {
    const colors = ['red', 'blue', 'yellow']

    if (count === colors.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }

    return colors[count]
  }

  const handleAddPlayer = () => {
    if (newPlayer !== '') {
      setPlayers([...players, { name: newPlayer, color: choosePlayerColor() }])
    }
  }

  const handleRemovePlayer = (playerName: string) => {
    setPlayers(players.filter((p) => p.name !== playerName))
  }

  const contextProviderValue = useMemo(
    () => ({
      players,
      setPlayers,
      newPlayer,
      setNewPlayer,
      handleAddPlayer,
      handleRemovePlayer,
    }),
    [players, newPlayer]
  )

  return (
    <PlayersContext.Provider value={contextProviderValue}>
      {children}
    </PlayersContext.Provider>
  )
}
