import React from 'react'
import { useSelector } from 'react-redux'
import OutputBar from './OutpuBar'

function MainOutput () {
  const { response, currentShape } = useSelector(state => state.cutOptimizer)
  const { loading } = useSelector(state => state.global)
  if (currentShape === -1) {
    return (
      <main className='Main'>
        Insert
      </main>
    )
  } else if (loading) {
    return (
      <main className='Main' style={{ backgroundColor: 'blue' }}>
        <div>Loading...</div>
      </main>
    )
  } else if (!loading && response.length > 0) {
    return (
      <main className='Main'>
        {response[currentShape].bars.map((item, index) => {
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
    return <div>Error</div>
  }
}

export default MainOutput

/*  */
