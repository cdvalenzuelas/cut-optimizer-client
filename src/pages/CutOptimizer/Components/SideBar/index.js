import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Shapes from './Shapes'
import Buttons from './Buttons'
import './styles.scss'

const SideBar = () => {
  const { readyToSend, names, materials, currentShape, errors } = useSelector(state => {
    const { currentShape, request = [] } = state.cutOptimizer

    const errors = request.map(item => item.error)
    const readyToSend = errors.length === 0 ? false : !errors.includes(true)
    const names = request.map(item => item.shapeName)
    const materials = request.map(item => item.material)

    return { readyToSend, names, materials, currentShape, errors }
  })

  const currentErrors = useMemo(() => errors, [JSON.stringify(errors)])
  const currentNames = useMemo(() => names, [JSON.stringify(names)])
  const currentMaterials = useMemo(() => materials, [JSON.stringify(materials)])

  return (
    <aside className='SideBar'>
      <h2 className='SideBar-Title'>Shapes</h2>
      <Shapes
        currentErrors={currentErrors}
        currentNames={currentNames}
        currentMaterials={currentMaterials}
        currentShape={currentShape}
      />
      <Buttons
        readyToSend={readyToSend}
      />
    </aside>
  )
}

export default memo(SideBar)
