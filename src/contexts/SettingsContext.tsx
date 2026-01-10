import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { themes } from '../constants/themes'
import { Player } from '../types/Player'

interface CreatedItemsByTheme {
  [themeId: string]: string[]
}

interface SettingsContextData {
  players: Player[]
  handleAddPlayer: (newPlayer: string) => void
  handleRemovePlayer: (playerName: string) => void
  handleReorderPlayers: (oldIndex: number, newIndex: number) => void
  createdPlaces: string[]
  handleAddPlace: (newPlace: string) => void
  handleRemovePlace: (place: string) => void
  timer: number
  handleChangeTimer: (isAdding: boolean) => void
  spiesQuantity: number
  handleChangeSpiesQuantity: (isAdding: boolean) => void
  spiesShouldKnowEachOther: boolean
  setSpiesShouldKnowEachOther: React.Dispatch<React.SetStateAction<boolean>>
  selectedThemeId: string
  selectedThemeName: string
  handleChangeTheme: (themeId: string) => void
  getThemeItems: () => string[]
}

export const SettingsContext = createContext({} as SettingsContextData)

export function ContextProvider({ children }: { children: ReactNode }) {
  const [createdItemsByTheme, setCreatedItemsByTheme] =
    useState<CreatedItemsByTheme>(() => {
      const items = localStorage.getItem('espiaozinho@createdItemsByTheme')
      return items ? JSON.parse(items) : {}
    })
  const [spiesQuantity, setSpiesQuantity] = useState(1)
  const [timer, setTimer] = useState<number>(15)
  const [players, setPlayers] = useState<Player[]>([])
  const [count, setCount] = useState(0)

  const [spiesShouldKnowEachOther, setSpiesShouldKnowEachOther] =
    useState(false)

  const [selectedThemeId, setSelectedThemeId] = useState<string>('places')

  const handleChangeTheme = (themeId: string) => {
    setSelectedThemeId(themeId)
  }

  const selectedThemeName = useMemo(() => {
    const theme = themes.find((t) => t.id === selectedThemeId)
    return theme ? theme.name : themes[0].name
  }, [selectedThemeId])

  const createdPlaces = useMemo(() => {
    return createdItemsByTheme[selectedThemeId] || []
  }, [createdItemsByTheme, selectedThemeId])

  const getThemeItems = () => {
    const theme = themes.find((t) => t.id === selectedThemeId)
    const themeItems = theme ? theme.items : themes[0].items
    const customItems = createdItemsByTheme[selectedThemeId] || []
    return [...themeItems, ...customItems]
  }

  useEffect(() => {
    localStorage.setItem(
      'espiaozinho@createdItemsByTheme',
      JSON.stringify(createdItemsByTheme)
    )
  }, [createdItemsByTheme])

  const choosePlayerColor = () => {
    const colors = ['red', 'blue', 'yellow']

    if (count === colors.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }

    return colors[count]
  }

  // eslint-disable-next-line consistent-return
  const handleChangeSpiesQuantity = (isAdding: boolean) => {
    if (players.length < 3)
      return toast(
        'É necessário haver pelo menos 3 jogadores antes de definir a quantidade de espiões!',
        { type: 'warning' }
      )

    if (isAdding) {
      if (spiesQuantity >= players.length - 1) {
        return toast('Número máximo de espiões!', { type: 'warning' })
      }

      return setSpiesQuantity((prev) => prev + 1)
    }

    if (spiesQuantity !== 1) {
      return setSpiesQuantity((prev) => prev - 1)
    }

    toast('É necessário haver pelo menos um espião!', { type: 'warning' })
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

  const handleReorderPlayers = (oldIndex: number, newIndex: number) => {
    setPlayers((prev) => {
      const newPlayers = [...prev]
      const [movedPlayer] = newPlayers.splice(oldIndex, 1)
      newPlayers.splice(newIndex, 0, movedPlayer)
      return newPlayers
    })
  }

  const handleAddPlace = (newPlace: string) => {
    const currentItems = createdItemsByTheme[selectedThemeId] || []
    const placeExists = currentItems.find((place) => place === newPlace)

    if (placeExists) {
      toast(`${newPlace} já está na lista!`, {
        type: 'warning',
      })
      return
    }

    setCreatedItemsByTheme({
      ...createdItemsByTheme,
      [selectedThemeId]: [...currentItems, newPlace],
    })
  }

  const handleRemovePlace = (place: string) => {
    const currentItems = createdItemsByTheme[selectedThemeId] || []
    setCreatedItemsByTheme({
      ...createdItemsByTheme,
      [selectedThemeId]: currentItems.filter((p) => p !== place),
    })
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
      handleReorderPlayers,
      createdPlaces,
      handleAddPlace,
      handleRemovePlace,
      timer,
      handleChangeTimer,
      spiesQuantity,
      handleChangeSpiesQuantity,
      spiesShouldKnowEachOther,
      setSpiesShouldKnowEachOther,
      selectedThemeId,
      selectedThemeName,
      handleChangeTheme,
      getThemeItems,
    }),
    [
      players,
      createdPlaces,
      timer,
      spiesQuantity,
      spiesShouldKnowEachOther,
      selectedThemeId,
      selectedThemeName,
      createdItemsByTheme,
    ]
  )

  return (
    <SettingsContext.Provider value={contextProviderValue}>
      {children}
    </SettingsContext.Provider>
  )
}
