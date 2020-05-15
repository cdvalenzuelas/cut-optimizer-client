import React from 'react'
import useAvailableBarsHook from './useAvailableBarsHook'

import ListOfAvailableBars from './ListOfAvailableBars'

const AvailableBars = () => {
  const { handleChange, shapeName, material, defaultlengthBar, availableBars } = useAvailableBarsHook()

  return (
    <div className='bars'>
      <div className='bars__bar'>
        <button name='newElements' onClick={handleChange}>Elements</button>
        <button name='availableBars' onClick={handleChange}>Available Bars</button>
        <div className='infoContainer'>
          <label className='label'>
            Shape
            <input type='text' name='shape' onChange={handleChange} value={shapeName} />
          </label>
          <label className='label'>
            Material
            <input type='text' name='material' onChange={handleChange} value={material} />
          </label>
          <label className='label'>
            Default Length
            <input type='number' name='defaultlengthBar' onChange={handleChange} value={defaultlengthBar} />
          </label>
          <button name='deleteShape' onClick={handleChange} className='button--main'>
            Delete
          </button>
        </div>
        <ListOfAvailableBars elements={availableBars} handleChange={handleChange} />
        <button name='addAvailableBar' onClick={handleChange}>+</button>
      </div>
    </div>
  )
}

export default AvailableBars
