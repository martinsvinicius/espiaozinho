import { createContext, ReactNode, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Player } from '../types/Player'

interface PlayersContextData {
  players: Player[]
  setPlayers: (players: Player[]) => void
  handleAddPlayer: (newPlayer: string) => void
  handleRemovePlayer: (playerName: string) => void
}

export const PlayersContext = createContext({} as PlayersContextData)

export function ContextProvider({ children }: { children: ReactNode }) {
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

  const handleAddPlayer = (newPlayer: string) => {
    const playerExists = players.find(({ name }) => name === newPlayer)

    if (playerExists) {
      toast(`${newPlayer} já está na lista!`, {
        type: 'warning',
      })

      return
    }

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
      handleAddPlayer,
      handleRemovePlayer,
    }),
    [players]
  )

  return (
    <PlayersContext.Provider value={contextProviderValue}>
      {children}
    </PlayersContext.Provider>
  )
}
