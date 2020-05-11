// Dependencies
import React from 'react'

// Hooks
import useButtonsHook from './useButtonsHook'

// Styles
import './styles.scss'
 
const ButtonContainer = () => {  

  const { handleChange, request, mode } = useButtonsHook()  

  return(
    <div className='buttonsContainer'>      
      <div className='shapesButtons'>
        {request.map((item, index) =>        
          <button key={index} value={`${index}`} onClick={handleChange} name='shapeInfo'>
            {index + 1}. {item.shape} {item.material}       
          </button>
        )}
      </div>
      {
        mode === 'input' && 
        <div className='actionsButtosn'>
          <button className='button--main' name='newShape' onClick={handleChange}>New</button>
          <button className='button--main' name='optimize' onClick={handleChange}>Optimize</button>
        </div>
      }
      { mode === 'output' && 
        <div className='actionsButtosn'>
          <button className='button--main' name='edit' onClick={handleChange}>Edit</button>
        </div>
      }      
    </div>    
  )    
}

export default ButtonContainer
