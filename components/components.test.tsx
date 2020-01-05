import React from 'react'
import LoadingRing from './LoadingRing'
import { render } from '@testing-library/react'

describe('a collection of react components', () => {
  it('renders a loading ring with a color parameter', () => {
    render(<LoadingRing color="red" />)
    const loadingSVG = document.getElementsByTagName('svg')[0]
    const strokeColor = loadingSVG.getAttribute('stroke')
    expect(strokeColor).toBe('red')
  })

  it('renders a loading ring with its default fall-back color', () => {
    render(<LoadingRing />)
    const loadingSVG = document.getElementsByTagName('svg')[0]
    const strokeColor = loadingSVG.getAttribute('stroke')
    expect(strokeColor).toBe('blue')
  })
})