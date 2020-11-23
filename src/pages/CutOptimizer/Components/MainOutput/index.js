import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import OutputBar from './OutpuBar'

function MainOutput () {
  const { response, mode } = useSelector(state => {
    const state2 = state.cutOptimizer
    const currentShape = state2.currentShape
    return { response: state2.response[currentShape], currentShape, mode: state2.mode }
  })

  const { error } = useSelector(state => state.global)

  if (mode === 'output') {
    if (error === '') {
      return (
        <main className='Main'>
          {response.bars.map((item, index) => {
            const { quantity, percentage, availableLength, length, description } = item
            return (
              <OutputBar
                key={index}
                quantity={quantity}
                percentage={percentage}
                availableLength={availableLength}
                length={length}
                description={description}
              />)
          })}
        </main>
      )
    } else {
      return (
        <main className='Main'>
          Error
        </main>
      )
    }
  }
}

export default memo(MainOutput)
