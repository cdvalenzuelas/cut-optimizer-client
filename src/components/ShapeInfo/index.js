import React from 'react'
import './styles.scss'
import useShape from './useShape'

const ShapeInfo = ({ index, item: { shapeName, material } }) => {
  const { handleChange, currentShape, shapeError } = useShape()
  const className = index === currentShape ? 'shapeInfo-selected' : 'shapeInfo'
  const style = { borderLeft: shapeError[index] === 0 ? '0.5rem solid var(--prymary)' : '0.5rem solid var(--tertiary)' }

  return (
    <div onClick={e => handleChange(e, index)} name='shapeInfo' className={className} style={style}>
      <h3>
        {index + 1}. {shapeName}
      </h3>
      <span>{material}</span>
    </div>
  )
}

export default ShapeInfo
