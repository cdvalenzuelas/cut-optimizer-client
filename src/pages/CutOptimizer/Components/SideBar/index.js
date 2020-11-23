import React, { memo, useMemo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Shapes from './Shapes'
import Buttons from './Buttons'
import './styles.scss'

const SideBar = () => {
  const { errors, names, materials, currentShape, readyToSend } = useSelector(state => {
    const { currentShape, request = [], readyToSend } = state.cutOptimizer

    const errors = request.map(item => Object.values(item.error).includes(true)) // OJO!!!!!!
    const names = request.map(item => item.shapeName)
    const materials = request.map(item => item.material)

    return { errors, names, materials, currentShape, readyToSend }
  })

  const dispatch = useDispatch()

  const [error, setError] = useState(true)

  const currentErrors = useMemo(() => errors, [JSON.stringify(errors)])
  const currentNames = useMemo(() => names, [JSON.stringify(names)])
  const currentMaterials = useMemo(() => materials, [JSON.stringify(materials)])

  useEffect(() => {
    if (currentErrors.length === 0 && !error) {
      setError(true)
    } else if (currentErrors.length > 0) {
      const cond1 = currentErrors.includes(true)
      if (cond1 && !error) {
        setError(true)
      } else if (!cond1 && error) {
        setError(false)
      }
    }
  }, [JSON.stringify(currentErrors)])

  useEffect(() => {
    if (readyToSend === error) {
      dispatch({ type: 'cutOptimizer/SET_READY_TO_SEND', payload: { value: !error } })
    }
  }, [error])

  return (
    <aside className='SideBar'>
      <h2 className='SideBar-Title'>Shapes</h2>
      <Shapes
        currentErrors={currentErrors}
        currentNames={currentNames}
        currentMaterials={currentMaterials}
        currentShape={currentShape}
      />
      <Buttons />
    </aside>
  )
}

export default memo(SideBar)
