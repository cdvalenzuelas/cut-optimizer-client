import React from 'react'
import useItem from './useItem'

const NewItem = () => {
  const { handleChange, quantity, defaultlengthBar } = useItem()

  return (
    <div className='Items-Elements'>
      <input
        className='Items-Name'
        type='text'
        value={name}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className='Items-Quantity'
        type='number'
        value={quantity}
        onChange={handleChange}
        autoComplete='off'
        min={1}
        step={0.1}
      />
      <input
        className='Items-Lenght'
        type='number'
        value={length}
        onChange={handleChange}
        autoComplete='off'
        max={defaultlengthBar}
        min={1}
        step={0.1}
      />
      <input
        className='Items-Delete'
        type='number'
        value={length}
        onChange={handleChange}
        autoComplete='off'
        max={defaultlengthBar}
        min={1}
        step={0.1}
      />
      <button name='deleteElement'>Delete</button>
    </div>
  )
}

export default NewItem

/*
name={`elementName${index2}`}
name={`elementQuantity${index2}`}
name={`elementLength${index2}`}
name={`elementLength${index2}`}
*/
