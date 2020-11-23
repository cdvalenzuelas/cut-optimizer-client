import React, { memo } from 'react'
import trash from './trash.svg'

const ItemPage = ({ name, quantity, length, item, handleChange, styles }) => {
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
        style={ styles.name }
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
        style={ styles.length}
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
        style={ styles.quantity }
      />
      <button className='Items-Delete'>
        <img src={ trash } onClick={e => handleChange(e, item)} name='delete'/>
      </button>
    </div>
  )
}

export default memo(ItemPage)
