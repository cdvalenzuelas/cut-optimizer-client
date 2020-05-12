// Dependencies
import React from 'react'
import useInputHook from './useInputHook'
import './styles.scss'
import ListOfElements from './ListOfElements'

const Input = () => {
  const { request, handleChange } = useInputHook()

  return (
    <div className='bars'>
      {request.map((item, index) => {
        const { shape, material, defaultlengthBar } = item
        return (
          <div className='bars__bar' key={index}>
            <button name={`deleteShape${index}`} onClick={handleChange}>
              Delete
            </button>
            <label>
              Shape
              <input
                type='text'
                name={`shape${index}`}
                onChange={handleChange}
                value={shape}
              />
            </label>
            <label>
              Material
              <input
                type='text'
                name={`material${index}`}
                onChange={handleChange}
                value={material}
              />
            </label>
            <label>
              Default Length
              <input
                type='number'
                name={`defaultlengthBar${index}`}
                onChange={handleChange}
                value={defaultlengthBar}
              />
            </label>
            <button name={`addElement${index}`} onClick={handleChange}>
              +
            </button>
            <ListOfElements
              elements={item.list}
              index={index}
              handleChange={handleChange}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Input
