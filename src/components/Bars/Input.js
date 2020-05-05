// Dependencies
import React from 'react'

// Styles
import './styles.scss'

const Input = ({ item, index, handleClick, display }) => {  

  const handleChange = e => { 
    const { name, value } = e.target
    let element      
    if(name === 'deleteElements'){           
      element = Number(value)      
    }      
    handleClick(e, index, element)
  }   

  const { list, availableBars, shape, material, defaultlengthBar } = item  

  return(
    <div className="bars" style={display}>  
      <div className="bars__bar">
        <button name="deleteShape" onClick={handleChange}>Delete</button>
        <label>
          Shape
          <input type='text' name='shape' onChange={handleChange} placeholder={shape} />
        </label>    
        <label>
          Material
          <input type='text' name='material' onChange={handleChange} placeholder={material} />
        </label>
        <label>
          Default Length
          <input type='number' name='defaultLength' onChange={handleChange} placeholder={defaultlengthBar} />
        </label>
        <button name="moreElements" onClick={handleChange}>+</button>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>                     
          {list.map((item2, index2) => {                        
            return(
              <tr key={index2}>
                <td><button name="deleteElements" onClick={handleChange} value={index2}>-</button></td>                
                <td><input type='text' value={item2.name} onChange={handleChange} /></td>
                <td><input type='text' value={item2.quantity} onChange={handleChange} /></td>
                <td><input type='text' value={item2.length} onChange={handleChange} /></td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Input