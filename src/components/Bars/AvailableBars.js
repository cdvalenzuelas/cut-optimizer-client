import React from 'react'
import useAvailableBarsHook from './useAvailableBarsHook'
import ShapeInfo from './ShapeInfo'

import ListOfAvailableBars from './ListOfAvailableBars'

const AvailableBars = () => {
  const { handleChange, availableBars } = useAvailableBarsHook()

  return (
    <div className='Bars'>
      {
        availableBars &&
          <div className='Bars_bar'>
            <ShapeInfo />
            <ListOfAvailableBars elements={availableBars} handleChange={handleChange} />
          </div>
      }
    </div>
  )
}

export default AvailableBars
