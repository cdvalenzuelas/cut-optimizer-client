// Dependencies
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Styles
import './styles.scss'

const Input = ({ data, handleClick }) => {

  const mode = useSelector(state => state.cutOptimizer.mode)
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    if(name === 'optimize'){      
      dispatch({type: 'SET_MODE'})
    }
  }  

  return(
    <div className='buttonsContainer'>
      <div>
        <h3>Shapes</h3>
      </div>
      <div className='shapesButtons'>
        {data.map((item, index) =>        
          <button key={index} value={`${index}`} onClick={handleClick} name='shapeToOptimize'>
            {item.shape} {item.material}       
          </button>
        )}
      </div>
      <div className='actionsButtosn'>
        <button className='button--main' name='new' onClick={handleClick}>New</button>
        <button className='button--main' name='optimize' onClick={handleChange}>Optimize</button>
      </div>
    </div>
  )  
}

export default Input