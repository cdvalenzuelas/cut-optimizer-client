import React from 'react'

const NewItem = ({ index2, name, handleChange, quantity, length, defaultlengthBar }) => {
  return (
    <div>
      <input
        className='Items-Name'
        name={`elementName${index2}`}
        type='text'
        value={name}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className='Items-Quantity'
        name={`elementQuantity${index2}`}
        type='number'
        value={quantity.toString()}
        onChange={handleChange}
        autoComplete='off'
        min={1}
        step={0.1}
      />
      <input
        className='Items-Lenght'
        name={`elementLength${index2}`}
        type='number'
        value={length.toString()}
        onChange={handleChange}
        autoComplete='off'
        max={defaultlengthBar}
        min={1}
        step={0.1}
      />
      <div>A</div>
    </div>
  )
}

export default NewItem
