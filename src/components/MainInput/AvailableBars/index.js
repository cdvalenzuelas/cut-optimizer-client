import React from 'react'
import useAvailableBars from './useAvailableBars'
import AvailableBar from './AvailableBar'

function AvailableBars () {
  const { handleChange, availableBars } = useAvailableBars()

  return (
    <section className='Items'>
      <div className='Items-Title'>
        <div className='Items-Lenght'>Lenght</div>
        <div className='Items-Quantity'>Quantity</div>
        <div className='Items-Delete'>Delete</div>
      </div>
      {availableBars.length >= 0 && availableBars.map((item, index) => {
        const { quantity, length } = item

        return (<AvailableBar
          key={index}
          quantity={quantity}
          length={length}
          item={index}
        />)
      })}
      <button
        className='Items-New'
        name='add'
        onClick={handleChange}
        style={{ width: '70%' }}
      >
        + New
      </button>
    </section>
  )
}

export default AvailableBars
