import React from 'react'
import useAvailableBarsHook from './useAvailableBarsHook'
import ShapeInfo from './ShapeInfo'

import ListOfAvailableBars from './ListOfAvailableBars'

const AvailableBars = () => {
  const { handleChange, availableBars } = useAvailableBarsHook()

  return (
    <div className='bars'>
      {
        availableBars &&
          <div className='bars__bar'>
            <ShapeInfo />
            <ListOfAvailableBars elements={availableBars} handleChange={handleChange} />
            <button name='addAvailableBar' onClick={handleChange}>+</button>
          </div>
      }
    </div>
  )
}

export default AvailableBars
