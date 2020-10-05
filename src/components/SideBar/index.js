// Dependencies
import React from 'react'

// Hooks
import useButtons from './useButtons'

import './styles.scss'

import ShapeInfo from '../ShapeInfo'

const SideBar = () => {
  const {
    handleChange,
    request,
    mode,
    currentShape,
    shapeError
  } = useButtons()

  return (
    <aside className='SideBar'>
      <h2 className='SideBar-Title'>Shapes</h2>
      <div className='SideBar-Shapes'>
        {request.map((item, index) => {
          return (
            <ShapeInfo
              key={index}
              index={index}
              handleChange={handleChange}
              currentShape={currentShape}
              shapeError={shapeError}
              item={item}
            />
          )
        })}
      </div>
      {mode === 'input' && (
        <div className='SideBar-Buttons'>
          <button
            className='btn-secondary'
            name='newShape'
            onClick={handleChange}
            style={{ width: '80%' }}
          >
            New
          </button>
          <button
            className='btn-primary'
            name='optimize'
            onClick={handleChange}
            style={{ width: '80%' }}
          >
            Optimize
          </button>
        </div>
      )}
      {mode === 'output' && (
        <div className='SideBar-Buttons'>
          <button
            style={{ width: '80%' }}
            className='btn-primary'
            name='edit'
            onClick={handleChange}
          >
            Edit
          </button>
        </div>
      )}
    </aside>
  )
}

export default SideBar
