// Dependencies
import React from 'react'

// Hooks
import useButtonsHook from './useButtonsHook'

// Styles
import './styles.scss'

const ButtonContainer = () => {
  const { handleChange, request, mode } = useButtonsHook()

  return (
    <div className='buttonsContainer'>
      <h2>Shapes</h2>
      <div className='shapesButtons'>
        {request.map((item, index) =>
          <button key={index} value={`${index}`} onClick={handleChange} name='shapeInfo' className='shapeInfo'>
            <h3>{index + 1}. {item.shape}</h3>
            <span>{item.material}</span>
          </button>
        )}
      </div>
      {
        mode === 'input' &&
          <div className='actionsButtons'>
            <button className='button--main' name='newShape' onClick={handleChange}>New</button>
            <button className='button--main' name='optimize' onClick={handleChange}>Optimize</button>
          </div>
      }
      {
        mode === 'output' &&
          <div className='actionsButtons'>
            <button className='button--main' name='edit' onClick={handleChange}>Edit</button>
          </div>
      }
    </div>
  )
}

export default ButtonContainer
