import React from 'react'
import { useSelector } from 'react-redux'
import useItems from './useItems'

import NewItem from './NewItem'

function Items () {
  const { request, currentShape } = useSelector(state => state.cutOptimizer)
  const { list } = request[currentShape]
  const { handleChange } = useItems()

  return (
    <section className='Items'>
      <div className='Items-Title'>
        <div className='Items-Name'>Name</div>
        <div className='Items-Quantity'>Quantity</div>
        <div className='Items-Lenght'>Lenght</div>
        <div className='Items-Delete'>Delete</div>
      </div>
      {list.length >= 0 && list.map((item, index) => <NewItem key={index} />)}
      <button className='Items-New' name='addElement' onClick={handleChange}>+New</button>
    </section>
  )
}

export default Items
