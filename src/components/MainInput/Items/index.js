import React from 'react'
import useItems from './useItems'

import Item from './Item'

function Items () {
  const { handleChange, list } = useItems()

  return (
    <section className='Items'>
      <div className='Items-Title'>
        <div className='Items-Name'>Name</div>
        <div className='Items-Lenght'>Lenght</div>
        <div className='Items-Quantity'>Quantity</div>
        <div className='Items-Delete'>Delete</div>
      </div>
      {list.length >= 0 && list.map((item, index) => {
        const { name, quantity, length } = item

        return (<Item
          key={index}
          name={name}
          quantity={quantity}
          length={length}
          item={index}
        />)
      })}
      <button className='Items-New' name='add' onClick={handleChange}>+ New</button>
    </section>
  )
}

export default Items
