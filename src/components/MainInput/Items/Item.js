import React from 'react'
import useItem from './useItem'

const Item = ({ name, quantity, length, item, defaultlengthBar }) => {
  const { handleChange, styles } = useItem()

  return (
    <div className='Items-Elements'>
      <input
        className='Items-Name Name'
        type='text'
        value={name}
        onChange={e => handleChange(e, item)}
        placeholder='Name'
        autoComplete='off'
        name='name'
        style={{ backgroundColor: styles.name }}
      />
      <input
        className='Items-Length'
        type='number'
        value={length}
        onChange={e => handleChange(e, item)}
        placeholder='Length'
        autoComplete='off'
        step={1}
        name='length'
        style={{ backgroundColor: styles.length }}
      />
      <input
        className='Items-Quantity'
        type='number'
        value={quantity}
        onChange={e => handleChange(e, item)}
        autoComplete='off'
        placeholder='Quantity'
        step={1}
        name='quantity'
        style={{ backgroundColor: styles.quantity }}
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

export default Item
