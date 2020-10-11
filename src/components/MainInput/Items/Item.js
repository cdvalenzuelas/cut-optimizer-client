import React from 'react'
import useItem from './useItem'

const NewItem = ({ name, quantity, length, item, defaultlengthBar }) => {
  const { handleChange } = useItem()

  if (length > defaultlengthBar) {
    length = defaultlengthBar
  } else if (length < 1) {
    length = 1
  }

  return (
    <div className='Items-Elements'>
      <input
        className='Items-Name'
        type='text'
        value={name}
        onChange={e => handleChange(e, item)}
        autoComplete='off'
        name='name'
      />
      <input
        className='Items-Length'
        type='number'
        value={length}
        onChange={e => handleChange(e, item)}
        autoComplete='off'
        max={defaultlengthBar}
        min={1}
        step={0.1}
        name='length'
      />
      <input
        className='Items-Quantity'
        type='number'
        value={quantity < 1 ? 1 : quantity}
        onChange={e => handleChange(e, item)}
        autoComplete='off'
        min={1}
        step={1}
        name='quantity'
      />
      <button
        className='Items-Delete'
        name='delete'
        onClick={e => handleChange(e, item)}
      >
        Delete
      </button>
    </div>
  )
}

export default NewItem
