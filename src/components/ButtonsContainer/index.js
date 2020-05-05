import React from 'react'

import './styles.scss'

const Output = ({ data, handleClick }) => { 
  return(
    <div className="buttonsContainer">
      { data && data.map((item,index) => 
        <button key={index} value={`${index}`} onClick={handleClick} name='optimizedShape' className=''>
          {item.shape} {item.material}       
        </button>)
      }
      <button className="button--main" name='edit' onClick={handleClick}>Edit</button>
    </div>
  )
}

const Input = ({ data, handleClick }) => {
  return(
    <div className="buttonsContainer">
      {data.map((item, index) =>        
        <button key={index} value={`${index}`} onClick={handleClick} name="shapeToOptimize">
          {item.shape} {item.material}       
        </button>
      )}
      <div>
        <button className="button--main" name='new' onClick={handleClick}>New</button>
        <button className="button--main" name='optimize' onClick={handleClick}>Optimize</button>
      </div>
    </div>
  )  
}
 
const ButtonContainer = ({data, mode, handleClick}) => {  
  if (mode === 'output'){
    return <Output data={data} handleClick={handleClick}/>
  } else {
    return <Input data={data} handleClick={handleClick} />
  }  
}

export default ButtonContainer

