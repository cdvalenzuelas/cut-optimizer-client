import React, { memo } from 'react'
import ShapeInfo from '../../ShapeInfo'

const Shapes = ({ currentErrors, currentNames, currentMaterials, currentShape }) => {
  return (
    <div className='SideBar-Shapes'>
      {currentNames.map((item, index) => {
        return (
          <ShapeInfo
            key={index}
            shape={index}
            shapeName={currentNames[index]}
            material={currentMaterials[index]}
            error={currentErrors[index]}
            currentShape={currentShape}
          />
        )
      })}
    </div>
  )
}

export default memo(Shapes)
