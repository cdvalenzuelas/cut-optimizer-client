import React from 'react'

import './styles.scss'

const ShapeInfo = ({
  index,
  currentShape,
  shapeError,
  handleChange,
  item: { shapeName, material }
}) => {
  const className = index === currentShape ? 'shapeInfo-selected' : 'shapeInfo'
  const style =
    shapeError[index] === 0
      ? { borderLeft: '0.5rem solid var(--prymary)' }
      : { borderLeft: '0.5rem solid var(--tertiary)' }

  const handle = () => {
    console.log(index)
  }

  return (
    <div onClick={handle} name='shapeInfo' className={className} style={style}>
      <h3>
        {index + 1}. {shapeName}
      </h3>
      <span>{material}</span>
    </div>
  )
}

export default ShapeInfo
