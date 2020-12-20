import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import OutputBar from './OutpuBar'

function MainOutput () {
  const { bars } = useSelector(state => {
    const { currentShape, response } = state.cutOptimizer
    return { bars: response.length === 0 ? [] : response[currentShape].bars }
  })

  return (
    <main className='Main'>
      {bars.map((item, index) => {
        const { quantity, percentage, availableLength, length, elements, type } = item
        return (
          <OutputBar
            key={index}
            quantity={quantity}
            percentage={percentage}
            availableLength={availableLength}
            length={length}
            elements={elements}
            type={type}
          />)
      })}
    </main>
  )
}

export default memo(MainOutput)
