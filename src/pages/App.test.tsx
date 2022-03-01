import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App correctly', () => {
  render(<App />)
  const linkElement = screen.getByText(/espiãozinho/i)
  expect(linkElement).toBeInTheDocument()
})
