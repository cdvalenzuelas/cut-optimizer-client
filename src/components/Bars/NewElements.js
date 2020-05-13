import React from 'react'
import useInputHook from './useInputHook'
import ListOfElements from './ListOfElements'

const NewElements = () => {
  const { shape, handleChange, currentShape } = useInputHook()
  const { shape: shapeName, material, defaultlengthBar, list } = shape
  return (
    <div className='bars__bar' key={currentShape}>
      <button name={`newElements${currentShape}`}>Elements</button>
      <button name={`availableBars${currentShape}`}>Available Bars</button>
      <div className='infoContainer'>
        <label className='label'>
            Shape
          <input type='text' name={`shape${currentShape}`} onChange={handleChange} value={shapeName} />
        </label>
        <label className='label'>
            Material
          <input type='text' name={`material${currentShape}`} onChange={handleChange} value={material} />
        </label>
        <label className='label'>
            Default Length
          <input type='number' name={`defaultlengthBar${currentShape}`} onChange={handleChange} value={defaultlengthBar} />
        </label>
        <button name={`deleteShape${currentShape}`} onClick={handleChange} className='button--main'>
            Delete
        </button>
      </div>
      <ListOfElements elements={list} index={currentShape} handleChange={handleChange} />
      <button name={`addElement${currentShape}`} onClick={handleChange}>+</button>
    </div>
  )
}

export default NewElements
