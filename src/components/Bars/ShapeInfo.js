import React from 'react'
import useShapeInfo from './useShapeInfo'

function ShapeInfo () {
  const { handleChange, shapeName, material, defaultlengthBar, cutLength } = useShapeInfo()

  return (
    <>
      <div className='control-buttons'>
        <div>
          <button name='newElements' onClick={handleChange} className='btn-alert'>Elements</button>
          <button name='availableBars' onClick={handleChange} className='btn-alert'>Available Bars</button>
        </div>
        <button name='deleteShape' onClick={handleChange} className='btn-alert'>Delete</button>
      </div>
      <div className='infoContainer'>
        <label className='label input1'>
            Shape
          <input type='text' name='shapeName' onChange={handleChange} value={shapeName} />
        </label>
        <label className='label input2'>
            Material
          <input type='text' name='material' onChange={handleChange} value={material} />
        </label>
        <label className='label input3'>
            Default Length
          <input
            type='number'
            name='defaultlengthBar'
            onChange={handleChange}
            value={defaultlengthBar}
            min={cutLength !== 0 ? cutLength : 1}
          />
        </label>
        <label className='label input4'>
            Cut Length
          <input
            type='number'
            name='cutLength'
            onChange={handleChange}
            value={cutLength}
            min={0}
          />
        </label>
      </div>
    </>
  )
}

export default ShapeInfo
