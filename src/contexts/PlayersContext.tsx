import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Player } from '../types/Player'

interface PlayersContextData {
  players: Player[]
  setPlayers: (players: Player[]) => void
  handleAddPlayer: (newPlayer: string) => void
  handleRemovePlayer: (playerName: string) => void
  createdPlaces: string[]
  handleAddPlace: (newPlace: string) => void
  handleRemovePlace: (place: string) => void
  timer: number
  handleChangeTimer: (isAdding: boolean) => void
}

export const PlayersContext = createContext({} as PlayersContextData)

export function ContextProvider({ children }: { children: ReactNode }) {
  const [createdPlaces, setCreatedPlaces] = useState<string[]>(() => {
    const places = localStorage.getItem('espiaozinho@createdPlaces')
    return places ? JSON.parse(places) : []
  })
  const [timer, setTimer] = useState<number>(15)
  const [players, setPlayers] = useState<Player[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    localStorage.setItem(
      'espiaozinho@createdPlaces',
      JSON.stringify(createdPlaces)
    )
  }, [createdPlaces])

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

  const handleAddPlace = (newPlace: string) => {
    const placeExists = createdPlaces.find((place) => place === newPlace)

    if (placeExists) {
      toast(`${newPlace} já está na lista!`, {
        type: 'warning',
      })
      return
    }

    setCreatedPlaces([...createdPlaces, newPlace])
  }

  const handleRemovePlace = (place: string) => {
    setCreatedPlaces(createdPlaces.filter((p) => p !== place))
  }

  const handleChangeTimer = (isAdding: boolean) => {
    if (isAdding) {
      setTimer(timer + 1)
    } else {
      setTimer(timer - 1)
    }
  }

  const contextProviderValue = useMemo(
    () => ({
      players,
      setPlayers,
      handleAddPlayer,
      handleRemovePlayer,
      createdPlaces,
      handleAddPlace,
      handleRemovePlace,
      timer,
      handleChangeTimer,
    }),
    [players, createdPlaces, timer]
  )

  return (
    <PlayersContext.Provider value={contextProviderValue}>
      {children}
    </PlayersContext.Provider>
  )
}
