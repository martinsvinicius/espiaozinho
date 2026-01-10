import { celebrities } from './celebrities'
import { movies } from './movies'
import { objects } from './objects'
import { places } from './places'

export interface Theme {
  id: string
  name: string
  items: string[]
}

export const themes: Theme[] = [
  { id: 'places', name: 'Lugares', items: places },
  { id: 'celebrities', name: 'Celebridades', items: celebrities },
  { id: 'movies', name: 'Filmes', items: movies },
  { id: 'objects', name: 'Objetos', items: objects },
]
