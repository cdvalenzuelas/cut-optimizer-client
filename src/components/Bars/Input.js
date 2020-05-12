// Dependencies
import React from 'react'
import useInputHook from './useInputHook'
import './styles.scss'
import ListOfElements from './ListOfElements'

const Input = () => {
  const { shape, handleChange, currentShape } = useInputHook()
  const { shape: shapeName, material, defaultlengthBar, list } = shape

  return (
    <div className='bars'>
      <div className='bars__bar' key={currentShape}>
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
        <button name={`addElement${currentShape}`} onClick={handleChange}>+</button>
        <ListOfElements elements={list} index={currentShape} handleChange={handleChange} />
      </div>
    </div>
  )
}

export default Input
