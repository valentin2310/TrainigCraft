import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import Home from '@/app/Page'
import { renderWithRouter } from '@/__tests__/vitest-utils';

 
test('Home', () => {
  renderWithRouter(<Home />)
  expect(screen.getByRole('heading', { level: 1, name: 'Training Craft' })).toBeDefined()
})