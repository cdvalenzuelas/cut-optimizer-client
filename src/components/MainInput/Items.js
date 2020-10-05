import React from 'react'
import { useSelector } from 'react-redux'

import NewItem from './NewItem'

function Items () {
  const { request, currentShape } = useSelector(state => state.cutOptimizer)
  const { list } = request[currentShape]
  console.log(list)

  return (
    <>
      <div className='Items'>
        <div className='Items-Name'>Name</div>
        <div className='Items-Quantity'>Quantity</div>
        <div className='Items-Lenght'>Lenght</div>
        <div className='Items-Delete'>Delete</div>
      </div>
      {/* {list.map((item, index) => (
        <NewItem key={index} />
      ))} */}
    </>
  )
}

export default Items
