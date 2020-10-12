import React from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'

const ShapeInfo = ({ index, item: { shapeName, material } }) => {
  const { currentShape, shapeError } = useSelector(state => state.cutOptimizer)
  const dispatch = useDispatch()

  const handleChange = (e, numberOfShape) => {
    if (currentShape !== Number(numberOfShape)) {
      dispatch({ type: 'SET_CURRENT_SHAPE', payload: { currentShape: Number(numberOfShape) } })
    }
  }

  const className = index === currentShape ? 'shapeInfo-selected' : 'shapeInfo'
  const style = { borderLeft: shapeError[index] === 1 ? '0.5rem solid var(--primary)' : '0.5rem solid var(--tertiary)' }

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
