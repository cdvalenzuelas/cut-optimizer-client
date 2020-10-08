import React from 'react'
import ShapeInfo from '../../ShapeInfo'
import { useSelector } from 'react-redux'

const Shapes = () => {
  const { request } = useSelector(state => state.cutOptimizer)

  return (
    <div className='SideBar-Shapes'>
      {request.map((item, index) => {
        return (
          <ShapeInfo
            key={index}
            index={index}
            item={item}
          />
        )
      })}
    </div>
  )
}

export default Shapes
