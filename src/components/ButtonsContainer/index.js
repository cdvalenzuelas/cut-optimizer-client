// Dependencies
import React from 'react'

// Hooks
import useButtonsHook from './useButtonsHook'

import './styles.scss'

const ButtonContainer = () => {
  const { handleChange, request, mode, currentShape } = useButtonsHook()

  return (
    <div className='ButtonsContainer'>
      <div className='shapesButtons'>
        {request.map((item, index) => {
          const className = index === currentShape ? 'shapeInfo-selected' : 'shapeInfo'

          return (
            <button key={index} value={`${index}`} onClick={handleChange} name='shapeInfo' className={className}>
              <h3>{index + 1}. {item.shapeName}</h3>
              <span>{item.material}</span>
            </button>
          )
        })}
      </div>
      {
        mode === 'input' &&
          <div className='actionsButtons'>
            <button className='btn-main' name='newShape' onClick={handleChange}>New</button>
            <button className='btn-main' name='optimize' onClick={handleChange}>Optimize</button>
          </div>
      }
      {
        mode === 'output' &&
          <div className='actionsButtons'>
            <button className='btn-main' name='edit' onClick={handleChange}>Edit</button>
          </div>
      }
    </div>
  )
}

export default ButtonContainer
