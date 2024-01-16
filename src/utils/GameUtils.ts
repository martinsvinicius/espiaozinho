import { Player } from '../types/Player'

const populateGameArray = (
  place: string,
  players: Player[],
  spiesQuantity: number
) => {
  let newGame: string[] = []

  players.forEach((_, index) => {
    if (index < players.length - spiesQuantity) newGame = [...newGame, place]
    else newGame = [...newGame, 'Espião']
  })

  return newGame
}

export const populateGameAndShuffle = (
  places: string[],
  players: Player[],
  spiesQuantity: number
) => {
  const randomPlace = places[Math.floor(Math.random() * places.length)]

  return populateGameArray(randomPlace, players, spiesQuantity)
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
