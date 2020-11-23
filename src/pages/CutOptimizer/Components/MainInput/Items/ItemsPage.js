import React, { memo } from 'react'
import Item from './Item'

function ItemsPage ({ handleChange, currentNames, defaultlengthBar, currenLengths, currentQuantities, getDataFromElements }) {
  return (
    <section className='Items'>
      <div className='Items-Title'>
        <div className='Items-Name'>Name</div>
        <div className='Items-Length'>Length</div>
        <div className='Items-Quantity'>Quantity</div>
        <div className='Items-Delete'></div>
      </div>
      {currentNames.length >= 0 && currentNames.map((item, index) => {
        return (<Item
          key={index}
          item={index}
          name={currentNames[index]}
          length={currenLengths[index]}
          quantity={currentQuantities[index]}
          currentNames={currentNames}
          defaultlengthBar={defaultlengthBar}
          getDataFromElements={getDataFromElements}
        />)
      })}
      <button className='Items-New' name='add' onClick={handleChange}>+ New</button>
    </section>
  )
}

export default memo(ItemsPage)
