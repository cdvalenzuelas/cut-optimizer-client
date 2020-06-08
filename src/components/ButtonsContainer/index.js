// Dependencies
import React from 'react'

// Hooks
import useButtons from './useButtons'

import './styles.scss'

const ButtonContainer = () => {
  const { handleChange, request, mode, currentShape, shapeError } = useButtons()

  return (
    <div className='ButtonsContainer'>
      <div className='shapesButtons'>
        {request.map((item, index) => {
          const className = index === currentShape ? 'shapeInfo-selected' : 'shapeInfo'
          const style = shapeError[index] === 0
            ? { borderLeft: '0.5rem solid var(--darkblue2)' }
            : { borderLeft: '0.5rem solid var(--orange1)' }

          return (
            <button key={index} value={`${index}`} onClick={handleChange} name='shapeInfo' className={className} style={style}>
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
