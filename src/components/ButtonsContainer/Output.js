// Dependencies
import React from 'react'

// Styles
import './styles.scss'

const Output = ({ data, handleClick }) => { 
  return(
    <div className='buttonsContainer'>
      <div>
        <h3>Shapes</h3>
      </div>      
      <div className='shapesButtons'>        
        { data && data.map((item,index) => 
          <button key={index} value={`${index}`} onClick={handleClick} name='optimizedShape'>
            {item.shape} {item.material}       
          </button>)
        }
      </div>
      <div className='actionsButtosn'>
        <button className='button--main' name='edit' onClick={handleClick}>Edit</button>
      </div>
    </div>
  )
}

export default Output

