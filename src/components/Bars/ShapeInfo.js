import React from 'react'
import useShapeInfo from './useShapeInfoHook'

function ShapeInfo () {
  const { handleChange, shapeName, material, defaultlengthBar, cutLength } = useShapeInfo()

  return (
    <>
      <button name='newElements' onClick={handleChange}>Elements</button>
      <button name='availableBars' onClick={handleChange}>Available Bars</button>
      <div className='infoContainer'>
        <label className='label'>
            Shape
          <input type='text' name='shapeName' onChange={handleChange} value={shapeName} />
        </label>
        <label className='label'>
            Material
          <input type='text' name='material' onChange={handleChange} value={material} />
        </label>
        <label className='label'>
            Default Length
          <input type='number' name='defaultlengthBar' onChange={handleChange} value={defaultlengthBar} />
        </label>
        <label className='label'>
            Cut Length
          <input type='number' name='cutLength' onChange={handleChange} value={cutLength} />
        </label>
        <button name='deleteShape' onClick={handleChange} className='button--main'>
            Delete
        </button>
      </div>
    </>
  )
}

export default ShapeInfo
