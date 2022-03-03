import { Player } from '../types/Player'

const populateGameArray = (place: string, players: Player[]) => {
  let newGame: string[] = []

  players.forEach((_, index) => {
    if (index < players.length - 1) newGame = [...newGame, place]
    else newGame = [...newGame, 'Espião']
  })

  return newGame
}

export const populateGameAndShuffle = (places: string[], players: Player[]) => {
  const randomPlace = places[Math.floor(Math.random() * places.length)]

  return populateGameArray(randomPlace, players)
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
