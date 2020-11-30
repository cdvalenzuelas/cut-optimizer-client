import React, { useCallback, useMemo, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import NewShape from '../NewShape'
import './styles.scss'

const ShapeInfo = ({ shape, shapeName, material, error, currentShape }) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const handleChange = useCallback((e, value) => {
    if (value !== currentShape) {
      dispatch({ type: 'cutOptimizer/SET_CURRENT_SHAPE', payload: { value } })
    }
  }, [currentShape])

  const style = useMemo(() => ({
    borderLeft: '0.5rem solid var(--tertiary)'
  }), [])

  const style2 = useMemo(() => ({
    borderLeft: '0.5rem solid var(--primary)'
  }), [])

  const className = useMemo(() => {
    return shape === currentShape ? 'shapeInfo-selected' : 'shapeInfo'
  }, [currentShape])

  return (
    <div onClick={e => handleChange(e, shape)} name='shapeInfo' className={className} style={error ? style2 : style}>
      <h3>
        {shape + 1}. {shapeName}
      </h3>
      <span>{material}</span>
      {shape === currentShape && <button onClick={e => setShowModal(true)}>Edit</button>}
      {showModal && <NewShape mode='edit' setShowModal={setShowModal}/>}
    </div>
  )
}

export default memo(ShapeInfo)
