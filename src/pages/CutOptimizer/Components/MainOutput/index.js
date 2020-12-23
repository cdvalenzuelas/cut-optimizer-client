import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import OutputBar from './OutpuBar'
import { barsStoreApi } from '@Utils/barsStoreApi'

function MainOutput () {
  const { bars, response, request, uid } = useSelector(state => {
    const { currentShape, response, request } = state.cutOptimizer
    const { uid } = state.global.user

    return { bars: response.length === 0 ? [] : response[currentShape].bars, response, request, uid }
  })

  const handleClick = useCallback(e => {
    const response2 = []

    response.forEach(({ bars }, index) => {
      const newAvailableBars = []
      const storeAvailableBars = []

      bars.forEach(({ availableLength, quantity, type, length }) => {
        if (availableLength > 0) {
          newAvailableBars.push({ length: availableLength, quantity })
        }

        if (type === 'store') {
          storeAvailableBars.push({ length, quantity })
        }
      })

      response2.push({
        name: request[index].shapeName,
        material: request[index].material,
        newAvailableBars,
        storeAvailableBars
      })
    })

    barsStoreApi(uid, response2)
  }, [Object.assign(response)])

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
      <button className='btn-primary btn-right-bottom' onClick={handleClick}>Save</button>
    </main>
  )
}

export default memo(MainOutput)
