// Dependencies
import React, { useState } from 'react'

// Hooks
import useInputHook from './useInputHook'

// Styles
import './styles.scss'

const Input = () => { 
  const { request, handleChange } = useInputHook()   

  return(
    <div className='bars'>  
      { request.map((item, index) => {   
        const { shape, material, defaultlengthBar } = item 
        return(
          <div className='bars__bar' key={index} >
            <button name={`deleteShape${index}`} onClick={handleChange}>Delete</button>
            <label>
              Shape
              <input type='text' name={`shape${index}`} onChange={handleChange} value={shape} />
            </label>    
            <label>
              Material
              <input type='text' name={`material${index}`} onChange={handleChange} value={material} />
            </label>
            <label>
              Default Length
              <input type='number' name={`defaultlengthBar${index}`} onChange={handleChange} value={defaultlengthBar} />
            </label>
            <button name={`addElement${index}`} onClick={handleChange}>+</button>
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
              {item.list.map((item2, index2) => {   
                const { name, quantity, length } = item2                    
                return(
                  <tr key={index2}>                                
                    <td><input name={`elementName${index}-${index2}`} type='text' value={name} onChange={handleChange} /></td>
                    <td><input name={`elementQuantity${index}-${index2}`} type='text' value={quantity} onChange={handleChange} /></td>
                    <td><input name={`elementLength${index}-${index2}`} type='text' value={length} onChange={handleChange} /></td>
                    <td><button name={`deleteElement${index}-${index2}`} onClick={handleChange} value={index2}>-</button></td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>)})}        
    </div>
  )
}

export default Input
