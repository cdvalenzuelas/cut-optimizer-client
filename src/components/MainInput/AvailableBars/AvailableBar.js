import React from 'react'
import useAvailableBar from './useAvailableBar'

const AvailableBar = ({ quantity, length, item }) => {
  const { handleChange } = useAvailableBar()

  return (
    <div className='Items-Elements'>
      <input
        className='Items-Length'
        type='number'
        value={length < 1 ? 1 : length}
        onChange={e => handleChange(e, item)}
        autoComplete='off'
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

export default AvailableBar
